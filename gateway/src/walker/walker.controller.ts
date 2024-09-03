import { Controller, Get, Inject, Post, Body, Param, Request } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { request } from 'http';
import { lastValueFrom } from 'rxjs';

@Controller('walker')
export class WalkerController {
  constructor(@Inject('KAFKA') private client: ClientKafka) {}

  @Get()
  getWalker(): string {
    return 'Walker';
  }

  @Post('registration')
  async walkerRegistration(@Body() walkerData: any): Promise<any> {
    const result = this.client.send('walkerRegistration', walkerData);
    return await lastValueFrom(result);
  }

  @Get('profile')
  async walkerGet(@Body() body: any, @Request() req): Promise<string> {
    const result = await this.client.send('walkerGet', {body,jwt: req.jwt});
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order-list')
  async getOrderList(@Body() body: any): Promise<string> {
    const result = await this.client.send('getOrderList', body);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order-list/:orderId')
  async getOrderDetail(@Param('orderId') orderId: string): Promise<string> {
    const result = await this.client.send('getOrderDetail', { orderId });
    const value = await lastValueFrom(result);
    return value;
  }

  @Post('order-list/:orderId/confirm-order')
  async confirmOrder(
    @Param('orderId') orderId: string,
    @Body() confirmData: any
  ): Promise<any> {
    const result = this.client.send('confirmOrder', {
      orderId,
      ...confirmData,
    });
    return await lastValueFrom(result);
  }

  @Post('order-list/:orderId/confirm-order/report')
  async postReport(@Param('orderId') orderId: string): Promise<string> {
    const result = await this.client.send('postReport', { orderId });
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order-list/:orderId/confirm-order/requester-id')
  async getRequesterIdByOrder(@Param('orderId') orderId: string): Promise<string> {
    const result = await this.client.send('getRequesterIdByOrder', { orderId });
    const value = await lastValueFrom(result);
    return value.requesterId;
  }

}
