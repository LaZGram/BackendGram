import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { MenuModule } from './menu/menu.module';
import { PrismaModule } from './prisma.module';
import { ReviewModule } from './review/review.module';
import { OptionModule } from './option/option.module';
import { ScheduleModule } from './schedule/schedule.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MenuModule, PrismaModule, ReviewModule, OptionModule, ScheduleModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
