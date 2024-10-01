import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CanteenModule } from './canteen/canteen.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma.module';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [CanteenModule, CanteenModule, ProfileModule, AuthModule, PrismaModule, OrderModule, ReportModule, AddressModule, PaymentModule,
    ConfigModule.forRoot({
    envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
    isGlobal: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
