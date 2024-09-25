import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [HttpModule, CacheModule.register(), OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
