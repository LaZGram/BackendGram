import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('requesterRegistration')
  requesterRegistration(msg: any): any {
    return this.appService.requesterRegistration(msg);
  }

  @MessagePattern('getCanteens')
  getCanteens(): Promise<any> {
    return this.appService.getCanteens();
  }
  
  @MessagePattern('searchMenu')
  searchMenu(msg: any): Promise<any> {
    return this.appService.searchMenu(msg);
  }

  @MessagePattern('getProfile')
  getProfile(msg: any): Promise<any> {
    return this.appService.getProfile(msg);
  }
  
  @MessagePattern('postPersonalInfo')
  postPersonalInfo(msg: any): any {
    return this.appService.postPersonalInfo(msg);
  }

  @MessagePattern('postChangeProfilePicture')
  postChangeProfilePicture(msg: any): any {
    return this.appService.postChangeProfilePicture(msg);
  }

  @MessagePattern('getDebitcard')
  getDebitcard(msg: any): any {
    return this.appService.getDebitcard(msg);
  }

  @MessagePattern('postChangeDebitCard')
  postChangeDebitCard(msg: any): any {
    return this.appService.postChangeDebitCard(msg);
  }

  @MessagePattern('createDebitcard')
  createDebitcard(msg: any): any {
    return this.appService.createDebitcard(msg);
  }

}
