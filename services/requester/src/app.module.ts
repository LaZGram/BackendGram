import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { RegistrationModule } from './registration/registration.module';
import { CanteenModule } from './canteen/canteen.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [RegistrationModule, CanteenModule, CanteenModule, ProfileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
