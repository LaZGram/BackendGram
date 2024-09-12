import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('walkerQueue')
  walkerQueue(): Promise<any> {
    return this.appService.walkerQueue();
  }

  @MessagePattern('showRequester')
  showRequester(): Promise<any> {
    return this.appService.showRequester();
  }

  @MessagePattern('showWalker')
  showWalker(): Promise<any> {
    return this.appService.showWalker();
  }

  @MessagePattern('showOrder')
  showOrder(): Promise<any> {
    return this.appService.showOrder();
  }

  @MessagePattern('postApproval')
  postApproval(msg: any): any {
    return this.appService.postApproval(msg);
  }
  
  @MessagePattern('verifyWalker')
  verifyWalker(msg: any): any {
    return this.appService.verifyWalker(msg);
  }
}
