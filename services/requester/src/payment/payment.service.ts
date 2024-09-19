import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { PaymentToken } from './dto/payment_token';

@Injectable()
export class PaymentService {
    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async getToken(){
        const json_data = await (await this.cacheManager.match('PAYMENT_TOKEN')).json();
        let payment_token = new PaymentToken();
        if(!json_data){
            this.httpService.post('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token', {
                "applicationKey" : "l73c276a43d10949f9a3f6ec564a63926c",
                "applicationSecret" : "7ee5a48b9bf549a0a4d64078e39cacb9"
            },
        )
        }
    }
}
