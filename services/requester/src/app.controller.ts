import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('requesterRegistration')
  requesterRegistration(msg: any): string {
    return this.appService.requesterRegistration(msg);
  }
}
