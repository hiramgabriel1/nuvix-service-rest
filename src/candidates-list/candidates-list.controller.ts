import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CandidatesListService } from './candidates-list.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class CandidatesListController {
  constructor(private readonly candidatesListService: CandidatesListService) {}

  @Post('postulate/send-application/user/:userId/post/:postId')
  @UseGuards(AuthGuard)
  sendPostulate(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number 
  ){
    return this.candidatesListService.sendApplication(userId, postId)
  }  

  @Get('show')
  showPostulates(){
    return this.candidatesListService.showListPostulates()
  }
}