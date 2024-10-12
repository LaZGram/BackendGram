import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Order, Transaction } from '@prisma/client';
import { OrderService } from 'src/order/order.service';
import { AppService } from 'src/app.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService, private readonly orderService: OrderService) {}

  @MessagePattern('getPaymentToken')
  async getPaymentToken(@Payload() msg: any) {
    return this.paymentService.createDeeplink(100);
  }

  @MessagePattern('getPaymentDeeplink')
  async getPaymentDeeplink(@Payload() msg: any) {
    let order: Order = await this.orderService.getOrder(parseInt(msg.orderId));
    let transaction: Transaction = await this.paymentService.getTransaction(order.transactionId);
    const transactionSCB = await this.paymentService.getTransactionSCB(transaction.transactionId);
    if (transactionSCB.length > 0){
      console.log({url:transactionSCB[0]['deeplinkUrl'], transactionId: transactionSCB[0]['transactionId']});
      return {url:transactionSCB[0]['deeplinkUrl'], transactionIdSCB: transactionSCB[0]['transactionId_SCB']};
    }
    let deepLink_res = await this.paymentService.createDeeplink(transaction.amount);
    await this.paymentService.createTransactionSCB(transaction.transactionId, deepLink_res['data']['transactionId'], deepLink_res['data']['deeplinkUrl']);
    return {url:deepLink_res['data']['deeplinkUrl'], transactionIdSCB: deepLink_res['data']['transactionId']};
  }

  @MessagePattern('getPaymentStatus')
  async getPaymentStatus(@Payload() msg: any) {
    let order: Order = await this.orderService.getOrder(parseInt(msg.orderId));
    let paymentStatus = await this.paymentService.getPaymentStatus(msg.transactionIdSCB);
    if (paymentStatus != true){
      throw new Error('Payment not completed');
    }
    await this.paymentService.updateTransactionStatus(order.transactionId, "completed");
    return true;
  }
}
