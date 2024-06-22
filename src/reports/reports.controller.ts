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

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @UseGuards(AuthGuard)
  @Post('/create/new-report/user/:userId')
  createReport(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() report: CreateReportDto,
  ) {
    return this.reportsService.createNewReport(userId, report);
  }

  @UseGuards(AuthGuard)
  @Patch('/edit-report/report/:reportId/user/:userId')
  editReportUser(
    @Param('reportId', ParseIntPipe) reportId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newReportBody: CreateReportDto,
  ) {
    return this.reportsService.editReport(reportId, userId, newReportBody);
  }

  @UseGuards(AuthGuard)
  @Get('/view-status/my-reports-status/report/:reportId/user/:userId')
  viewMyReportsStatus(
    @Param('reportId', ParseIntPipe) reportId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.reportsService.statusReport(reportId, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/show-list-reports')
  async showAllReportsList() {
    return this.reportsService.showAllReports();
  }

  @UseGuards(AuthGuard)
  @Get('/show-my-reports/:userId')
  async showMyReports(@Param('userId', ParseIntPipe) userId: number) {
    return this.reportsService.showMyReports(userId);
  }

  // todo: admin methods only
  // @UseGuards(AuthGuard)
  @Post('/admin/accept-report/report/:reportId')
  approveReport(@Param('reportId', ParseIntPipe) reportId: number) {
    return this.reportsService.acceptReport(reportId);
  }

  // @UseGuards()
  @Post('/admin/decline-report/report/:reportId')
  declineReport(@Param('reportId', ParseIntPipe) reportId: number) {
    return this.reportsService.declineReport(reportId)
  }
}
