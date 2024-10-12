import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentToken } from './dto/getPaymentToken';
import { env } from 'process';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class PaymentService {
    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly prismaService: PrismaService) { }

    async getToken() {
        const token = await this.cacheManager.get<PaymentToken>('payment_token')
        if (token && token.expiresAt > Date.now()) {
            return token
        }
        if (!env.PAYMENT_API || !env.PAYMENT_API_SECRET) {
            throw new Error('Payment API or Payment API Secret is not set')
        }
        const response = await lastValueFrom(await this.httpService.post('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',
            {
                applicationKey: env.PAYMENT_API,
                applicationSecret: env.PAYMENT_API_SECRET
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'resourceOwnerId': env.PAYMENT_API,
                    'requestUId': '0b997805-c4a7-4539-bd9f-05ca1c7113b0',
                    'accept-language': 'EN',
                }
            }
        ));
        const paymentToken: PaymentToken = { accessToken: response.data.data.accessToken, expiresAt: Date.now() + response.data.data.expiresIn * 1000 }
        console.log(paymentToken);
        await this.cacheManager.set('payment_token', paymentToken, paymentToken.expiresAt - Date.now())
        return paymentToken
    }

    async createDeeplink(amount: number) {
        let data = {
            "transactionType": "PURCHASE",
            "transactionSubType": ["BP", "CCFA", "CCIPP"],
            "sessionValidityPeriod": 60,
            "sessionValidUntil": "",
            "billPayment": {
                "paymentAmount": amount,
                "accountTo": "253344422001319",
                "ref1": "ABCDEFGHIJ1234567890",
                "ref2": "ABCDEFGHIJ1234567890",
                "ref3": "ABCDEFGHIJ1234567890"
            },
            "creditCardFullAmount": {
                "merchantId": "529704967523053",
                "terminalId": "462794700623039",
                "orderReference": "12345678",
                "paymentAmount": amount
            },
            "installmentPaymentPlan": {
                "merchantId": "529704967523053",
                "terminalId": "462794700623039",
                "orderReference": "AA100001",
                "paymentAmount": amount,
                "tenor": "12",
                "ippType": "3",
                "prodCode": "1001"
            },
            "merchantMetaData": {
                "callbackUrl": "",
                "merchantInfo": {
                    "name": "SANDBOX MERCHANT NAME"
                },
                "extraData": {},
                "paymentInfo": [
                    {
                        "type": "TEXT_WITH_IMAGE",
                        "title": "",
                        "header": "",
                        "description": "",
                        "imageUrl": ""
                    },
                    {
                        "type": "TEXT",
                        "title": "",
                        "header": "",
                        "description": ""
                    }
                ]
            }
        }
        const token = await this.getToken()
        const response = await lastValueFrom(await this.httpService.post('https://api-sandbox.partners.scb/partners/sandbox/v3/deeplink/transactions',
            data,
            {
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${token.accessToken}`, 
                    'resourceOwnerId': env.PAYMENT_API, 
                    'requestUId': '017430e9-5203-4e53-ab8f-e1ee742c1355', 
                    'channel': 'scbeasy', 
                    'accept-language': 'EN',
                }
            }
        ));
        console.log(response);
        return response.data
    }

    async getTransaction(transactionId: number) {
        try{
            return await this.prismaService.transaction.findUnique({
                where: {
                    transactionId: transactionId
                }
            });
        }
        catch(e) {
            throw new Error(e);
        }
    }

    async createTransactionSCB(transactionId: number, transactionId_SCB: string, deepLinkUrl: string) {
        try{
            return await this.prismaService.transactionSCB.create({
                data: {
                    transactionId: transactionId,
                    transactionId_SCB: transactionId_SCB,
                    deeplinkUrl: deepLinkUrl
                }
            })
        }
        catch(e) {
            throw new Error(e);
        }
    }

    async getTransactionSCB(transactionId: number) {
        try{
            return await this.prismaService.transactionSCB.findMany({
                where: {
                    transactionId: transactionId
                }
            });
        }
        catch(e) {
            throw new Error(e);
        }
    }

    async getPaymentStatus(transactionIdSCB: string) : Promise<boolean> {
        let status = 0;
        for (let i = 0; i < transactionIdSCB.length; i++) {
            const token = await this.getToken()
            const response: any = await lastValueFrom(await this.httpService.get(`https://api-sandbox.partners.scb/partners/sandbox/v2/transactions/${transactionIdSCB}`,
            {
                headers: { 
                    'authorization': `Bearer ${token.accessToken}`, 
                    'resourceOwnerId': env.PAYMENT_API, 
                    'requestUId': '40f6db45-0cab-4479-99b5-ccad60405417', 
                    'accept-language': 'EN'
                  }
            }
            ));
            if(response.data.data['statusCode'] == 1){
                return true;
            }
        }
        return false;
    }

    async updateTransactionStatus(transactionId: number, status: string) {
        try{
            return await this.prismaService.transaction.update({
                where: {
                    transactionId: transactionId
                },
                data: {
                    status: status
                }
            });
        }
        catch(e) {
            throw new Error(e);
        }
    }
}
