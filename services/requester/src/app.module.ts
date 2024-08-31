import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CanteenModule } from './canteen/canteen.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [CanteenModule, CanteenModule, ProfileModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
