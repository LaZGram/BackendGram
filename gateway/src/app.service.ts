import { Inject, Injectable } from '@nestjs/common';
import { CreateMenuRequest } from './dtos/create-menu-request.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World! Welcome';
  }
}
