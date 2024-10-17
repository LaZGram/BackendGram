import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('walkerRegistration')
  walkerRegistration(msg: any): any {
    return this.appService.walkerRegistration(msg);
  }

  @MessagePattern('walkerGet')
  walkerGet(msg: any): any {
    return this.appService.walkerGet(msg);
  }
  
  @MessagePattern('updateWalkerProfile')
  updateWalkerProfile(msg: any): any {
    return this.appService.updateWalkerProfile(msg);
  }
  
  @MessagePattern('getOrderList')
  getOrderList(msg: any): any {
    return this.appService.getOrderList(msg);
  }

  @MessagePattern('getOrderDetail')
  getOrderDetail(msg: any): any {
    return this.appService.getOrderDetail(msg);
  }

  @MessagePattern('confirmOrder')
  confirmOrder(msg: any): any {
    return this.appService.confirmOrder(msg);
  }

  @MessagePattern('postReport')
  postReport(msg: any): any {
    return this.appService.postReport(msg);
  }

  @MessagePattern('getRequesterIdByOrder')
  getRequesterIdByOrder(msg: any): any {
    return this.appService.getRequesterIdByOrder(msg);
  }

  @MessagePattern('updateOrderStatus')
  updateOrderStatus(msg: any): any {
    return this.appService.updateOrderStatus(msg);
  }

  @MessagePattern('orderHistory')
  orderHistory(msg: any): any {
    return this.appService.orderHistory(msg);
  }
  
  @MessagePattern('confirmOrderItem')
  confirmOrderItem(msg: any): any {
    return this.appService.confirmOrderItem(msg);
  }
}
