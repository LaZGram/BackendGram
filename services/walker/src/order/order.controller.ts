import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('acceptOrder')
  async acceptOrder(msg: object) {
    const orderId = parseInt(msg['orderId'].toString());
    const authId = msg['authId'].toString();
    return this.orderService.acceptOrder(authId, orderId);
  }
}
