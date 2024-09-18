import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('getShopOrder')
  getShopOrder(msg: object) {
    const authId = msg['authId'].toString();
    return this.orderService.getOrders(authId);
  }

  @MessagePattern('getShopOrderHistory')
  getShopOrderHistory(msg: object) {
    const authId = msg['authId'].toString();
    if (!msg['date']) {
      return this.orderService.getOrderHistory(authId, new Date().toString());
    }
    const date = msg['date'].toString();
    return this.orderService.getOrderHistory(authId, date);
  }

  @MessagePattern('updateShopOrderStatus')
  updateShopOrderStatus(msg: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(msg);
  }
}
