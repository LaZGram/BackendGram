import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, AppService],
})
export class ReportModule {}
