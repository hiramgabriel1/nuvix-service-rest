import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/report.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @UseGuards(AuthGuard)
  @Post('reports/create/new-report/user/:userId')
  createReport(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() report: CreateReportDto,
  ) {
    return this.reportsService.createNewReport(userId, report);
  }

  @UseGuards(AuthGuard)
  @Patch('reports/edit-report/user/:userId')
  editReportUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newReportBody: CreateReportDto
  ) {
    return this.reportsService.editReport(userId, newReportBody);
  }
}
