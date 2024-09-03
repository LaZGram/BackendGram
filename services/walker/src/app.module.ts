import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { OrderModule } from './order/order.module';
import { RegistrationModule } from './registration/registration.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [OrderModule, RegistrationModule, ReportModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
