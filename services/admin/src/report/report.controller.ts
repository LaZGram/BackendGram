import { Controller } from '@nestjs/common';
import { ReportService } from './report.service';
import { MessagePattern } from '@nestjs/microservices';
import { SearchReportDto } from './dto/search-report.dto';
import { FilterReportDto } from './dto/filter-report.dto';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @MessagePattern('getReport')
  getReport() {
    return this.reportService.getReport();
  }

  @MessagePattern('getReportInfo')
  getReportInfo(msg: object) {
    const reportId = parseInt(msg['reportId'].toString());
    return this.reportService.getReportInfo(reportId);
  }

  @MessagePattern('searchReport')
  searchReport(msg: SearchReportDto) {
    return this.reportService.searchReport(msg);
  }

  @MessagePattern('filterReport')
  filterReport(msg: FilterReportDto) {
    return this.reportService.filterReport(msg);
  }
}
