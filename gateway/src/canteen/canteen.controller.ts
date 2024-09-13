import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetCanteensDto } from './dto/canteen.dto';

@ApiTags('Canteen')
@Controller('canteen')
export class CanteenController {
  constructor(@Inject('KAFKA') private client: ClientKafka) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of canteens' })
  @ApiResponse({ status: 200, description: 'Canteen list retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  async getCanteens(): Promise<string> {
    const result = await this.client.send('getCanteens', {});
    const value = await lastValueFrom(result);
    return value;
  }
}
