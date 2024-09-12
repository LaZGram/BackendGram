import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AppService],
})
export class OrderModule {}
