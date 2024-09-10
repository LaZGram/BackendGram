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

  @MessagePattern('getProfile')
  getProfile(): Promise<any> {
    return this.appService.getProfile();
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
