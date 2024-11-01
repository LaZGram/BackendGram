import { Controller, Inject } from '@nestjs/common';
import { CanteenService } from './canteen.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class CanteenController {
  constructor(private readonly canteenService: CanteenService, @Inject('ADMIN_CANTEEN') private client: ClientKafka) {}

  @MessagePattern('getCanteen')
  getCanteen() {
    return this.canteenService.getCanteen();
  }

  @MessagePattern('getShopInCanteen')
  getShopInCanteen(data: object) {
    const canteenId = parseInt(data['canteenId'].toString());
    return this.canteenService.getShopInCanteen(canteenId);
  }

  @MessagePattern('adminGetShopMenu')
  getShopMenu(data: object) {
    const shopId = parseInt(data['shopId'].toString());
    return this.canteenService.getShopMenu(shopId);
  }

  @MessagePattern('adminGetShopOrderHistory')
  getShopOrderHistory(data: object) {
    const shopId = parseInt(data['shopId'].toString());
    return this.canteenService.getShopOrderHistory(shopId);
  }

  @MessagePattern('adminGetShopInfo')
  getShopInfo(data: object) {
    const shopId = parseInt(data['shopId'].toString());
    return this.canteenService.getShopInfo(shopId);
  }

  onModuleInit() {
    const topic_list = ['getMenu', 'getShopOrderHistory', 'getShopInfo']
    topic_list.forEach(async (topic) => {
      await this.client.subscribeToResponseOf(topic);
    });
  }
}
