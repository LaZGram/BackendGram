import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern('getStatus')
  getStatus(@Payload() msg: object) {
    const orderId = parseInt(msg["orderId"].toString());
    return this.orderService.getStatus(orderId);
  }

  @MessagePattern('cancelOrder')
  cancleOrder(@Payload() msg: object) {
    const orderId = parseInt(msg["orderId"].toString());
    return this.orderService.cancleOrder(orderId);
  }

  @MessagePattern('getWalker')
  getWalker(@Payload() msg: object) {
    const orderId = parseInt(msg["orderId"].toString());
    return this.orderService.getWalker(orderId);
  }
}
