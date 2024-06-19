import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/report.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
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

  @UseGuards(AuthGuard)
  @Get('reports/view-status/my-reports-status/report/:reportId/user/:userId')
  viewMyReportsStatus(
    @Param('reportId', ParseIntPipe) reportId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ){
    return this.reportsService.statusReport(reportId, userId)
  }

  // @UseGuards(AuthGuard)
  @Get('reports/show-list-reports')
  async showAllReportsList(){
    return this.reportsService.showAllReports()
  }

  // todo: admin methods only
  @UseGuards(AuthGuard)
  @Post('reports/admin/accept-report/report/:reportId')
  private approveReport(
    @Param('reportId', ParseIntPipe) reportId: number
  ){
    return
  }

  @Post()
  private declineReport(){

  }
}
