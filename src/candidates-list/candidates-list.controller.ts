import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CandidatesListService } from './candidates-list.service';

@Controller()
export class CandidatesListController {
  constructor(private readonly candidatesListService: CandidatesListService) {}

  @Post('postulate/send-application/user/:userId/post/postId')
  sendPostulate(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number 
  ){
    return this.candidatesListService.sendApplication(userId, postId)
  }  

  // @Get('')
}
