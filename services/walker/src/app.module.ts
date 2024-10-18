import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RegistrationModule } from './registration/registration.module';
import { ReportModule } from './report/report.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma.module';
import { AdressModule } from './address/adress.module';

@Module({
  imports: [ RegistrationModule, ReportModule, OrderModule, PrismaModule, AdressModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
