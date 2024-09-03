import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @MessagePattern('createReport')
  create(@Payload() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }
}
