import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCanteenDto, CreateShopDto, SearchShopDto } from './dto/';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';
import { UpdateShopStatusDto } from './dto/update-shop-status.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createCanteen')
  createCanteen(msg: CreateCanteenDto) {
    return this.appService.createCanteen(msg);
  }

  @MessagePattern('createShop')
  createShop(msg: CreateShopDto) {
    return this.appService.createShop(msg);
  }

  @MessagePattern('shopLogin')
  loginShop(msg: CreateShopDto) {
    return this.appService.loginShop(msg);
  }
  @MessagePattern('updateShopInfo')
  updateShopInfo(msg: UpdateShopInfoDto) {
    return this.appService.updateShopInfo(msg);
  }

  @MessagePattern('getShopInfo')
  getShopInfo(msg: object) {
    const authId = msg['authId'].toString();
    return this.appService.getShopInfo(authId);
  }

  @MessagePattern('updateShopStatus')
  updateShopStatus(msg: UpdateShopStatusDto) {
    return this.appService.updateShopStatus(msg);
  }
  
  @MessagePattern('searchShop')
  searchShop(msg: SearchShopDto): string {
    return this.appService.searchShop(msg);
  }
}
