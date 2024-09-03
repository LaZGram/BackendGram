import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @MessagePattern('createReport')
  create(@Payload() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @MessagePattern('findAllReport')
  findAll() {
    return this.reportService.findAll();
  }

  @MessagePattern('findOneReport')
  findOne(@Payload() id: number) {
    return this.reportService.findOne(id);
  }

  @MessagePattern('updateReport')
  update(@Payload() updateReportDto: UpdateReportDto) {
    return this.reportService.update(updateReportDto.id, updateReportDto);
  }

  @MessagePattern('removeReport')
  remove(@Payload() id: number) {
    return this.reportService.remove(id);
  }
}
