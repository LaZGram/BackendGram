import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';
import { CanteenModule } from './canteen/canteen.module';

@Module({
  imports: [PrismaModule, OrderModule, ReportModule, CanteenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
