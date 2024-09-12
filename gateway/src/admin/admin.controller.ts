import { Controller, Get, Post, Body, Param, Inject, Request } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyWalkerDto , PostApprovalDto} from './dto/admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(@Inject('KAFKA') private client: ClientKafka) {}

  @Get()
  @ApiOperation({ summary: 'Get walker information' })
  @ApiResponse({ status: 200, description: 'Returns admin info.' })
  getWalker(): string {
    return 'ADMIN';
  }

  @Get('verify')
  @ApiOperation({ summary: 'Show list of walkers with status false' })
  @ApiResponse({ status: 200, description: 'Returns list of walkers pending approval.' })
  async walkerQueue(): Promise<string> {
    const result = await this.client.send('walkerQueue', {});
    const value = await lastValueFrom(result);
    return value;
  }

  @Post('verify/:id')
  @ApiOperation({ summary: 'Verify a walker by changing their status to true' })
  @ApiResponse({ status: 200, description: 'Walker status updated successfully.' })
  async verifyWalker(@Body() verifyWalkerDto: VerifyWalkerDto,@Request() req): Promise<string> {
    const result = await this.client.send('verifyWalker', { ...verifyWalkerDto, authId: req.jwt.authId });
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('requester')
  @ApiOperation({ summary: 'Show list of all requesters' })
  @ApiResponse({ status: 200, description: 'Returns list of requesters.' })
  async showRequester(): Promise<any> {
    const result = this.client.send('showRequester', {});
    return await lastValueFrom(result);
  }

  @Get('walker')
  @ApiOperation({ summary: 'Show list of walkers with status true' })
  @ApiResponse({ status: 200, description: 'Returns list of verified walkers.' })
  async showWalker(): Promise<any> {
    const result = this.client.send('showWalker', {});
    return await lastValueFrom(result);
  }

  @Get('order')
  @ApiOperation({ summary: 'Show list of all orders' })
  @ApiResponse({ status: 200, description: 'Returns list of all orders.' })
  async showOrder(): Promise<any> {
    const result = this.client.send('showOrder', {});
    return await lastValueFrom(result);
  }

  @Post('approval/:id')
  @ApiOperation({ summary: 'Approve or disapprove an order' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  async postApproval(
    @Param('id') orderId: number,
    @Body() postApprovalDto: PostApprovalDto,
  ): Promise<any> {
    const result = this.client.send('postApproval', {
      orderId: orderId,
      orderStatus: postApprovalDto.orderStatus,
    });

    return await lastValueFrom(result);
  }
}
