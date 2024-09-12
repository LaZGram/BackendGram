import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, AppService],
})
export class MenuModule {}
