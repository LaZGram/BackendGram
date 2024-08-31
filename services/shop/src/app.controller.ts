import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCanteenDto, CreateShopDto, SearchShopDto } from './dto/';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createCanteen')
  createCanteen(msg: CreateCanteenDto) {
    return this.appService.createCanteen(msg);
  }

  @MessagePattern('createShop')
  createShop(msg: CreateShopDto): string {
    return this.appService.createShop(msg);
  }
  
  @MessagePattern('searchShop')
  searchShop(msg: SearchShopDto): string {
    return this.appService.searchShop(msg);
  }
}
