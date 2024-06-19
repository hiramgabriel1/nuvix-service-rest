import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CandidatesListService } from './candidates-list.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class CandidatesListController {
  constructor(private readonly candidatesListService: CandidatesListService) { }

  @UseGuards(AuthGuard)
  @Post('postulate/send-application/user/:userId/post/:postId')
  sendPostulate(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.candidatesListService.sendApplication(userId, postId);
  }

  @UseGuards(AuthGuard)
  @Post('postulate/approve-postulate/user/:userId/post/:postId')
  approvePostulateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.candidatesListService.approvePostulate(userId, postId);
  }

  @UseGuards(AuthGuard)
  @Post('postulate/decline-postulate/user/:userId/post/:postId')
  declinePostulateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.candidatesListService.declinePostulate(userId, postId);
  }

  @UseGuards(AuthGuard)
  @Get('postulate/my-companions/user/:userId/post/:workId')
  myCompanions(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('workId', ParseIntPipe) workId: number,
  ){
    return this.candidatesListService.myCompanions(userId, workId)
  }
  // @Get('show')
  // showPostulates(){
  //   return this.candidatesListService.showListPostulates()
  // }
}
