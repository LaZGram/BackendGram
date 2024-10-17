import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { FilterOrderDto } from './dto/filter-order.dto';
import { SearchOrderDto } from './dto/search-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('getToDayOrder')
  getToDayOrder() {
    return this.orderService.getToDayOrder();
  }

  @MessagePattern('getOrderInfo')
  getOrderInfo(msg: object) {
    const orderId = parseInt(msg['orderId'].toString());
    return this.orderService.getOrderInfo(orderId);
  }

  @MessagePattern('searchOrder')
  searchOrder(msg: SearchOrderDto) {
    return this.orderService.searchOrder(msg);
  }

  @MessagePattern('filterOrder')
  filterOrder(msg: FilterOrderDto) {
    return this.orderService.filterOrder(msg);
  }

  @MessagePattern('updateShopStatusByAdmin')
  updateShopStatusByAdmin(msg: any): any {
    return this.orderService.updateShopStatusByAdmin(msg);
  }

  @MessagePattern('updateMenuStatusByAdmin')
  updateMenuStatusByAdmin(msg: any): any {
    return this.orderService.updateMenuStatusByAdmin(msg);
  }
}
