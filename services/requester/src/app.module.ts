import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RegistrationModule } from './registration/registration.module';
import { CanteenModule } from './canteen/canteen.module';
import { ProfileModule } from './profile/profile.module';
import { DebitcardModule } from './debitcard/debitcard.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RegistrationModule, CanteenModule, CanteenModule, ProfileModule, DebitcardModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
