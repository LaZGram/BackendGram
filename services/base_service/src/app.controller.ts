import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HelloDto } from '../dtos/hello.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('hello')
  getHello(@Payload() msg:HelloDto): string {
    console.log(msg.message);
    return this.appService.getHello(msg);
  }
}
