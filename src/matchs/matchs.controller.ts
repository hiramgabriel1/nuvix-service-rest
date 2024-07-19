import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MatchsService } from './matchs.service';

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) { }

  @Get('/user/matchs/:userId')
  public matchUsers(@Param('userId', ParseIntPipe) userId: number) {
    return this.matchsService.findMatchsByUser(userId);
  }

  // @Get('/user/matchs/create/')
  // public createMatchWeekly() {
  //   return this.matchsService.createMatchWeekly();
  // }
}
