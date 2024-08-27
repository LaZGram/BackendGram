import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateMenuRequest } from 'src/dtos/create-menu-request.dto';

@Controller('shop')
export class ShopController {
  constructor(@Inject('KAFKA') private client: ClientKafka) { }

  @Post('create-menu')
  async createMenu(@Body() createMenuRequest: CreateMenuRequest): Promise<string> {
      const result = await this.client.send('createMenu', createMenuRequest);
      const value = await lastValueFrom(result);
      return value;
  }
}
