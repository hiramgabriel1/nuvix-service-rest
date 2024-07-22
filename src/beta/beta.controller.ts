import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BetaService } from './beta.service';
import { UserBetaDto } from './dto/addUserBeta.dto';

@Controller('beta')
export class BetaController {
  constructor(private readonly betaService: BetaService) {}

  @Post('/add-user')
  public addUser(@Body() userBeta: UserBetaDto) {
    return this.betaService.addUserBeta(userBeta);
  }

  @Patch('/update/status-user/:userId/')
  public updateStatus(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() isAccepted: boolean
  ) {
    return this.betaService.updateUserStatus(userId, isAccepted);
  }

  @Get('/users-accepted/show')
  public getUsers(){
    return this.betaService.showUsersCandidates()
  }

  @Get('/all-users')
  public show(){
    return this.betaService.showUsers()
  }

  @Delete('delete/:userId')
  public delete(@Param('userId', ParseIntPipe) userId: number){
    return this.betaService.deleteUser(userId)
  }
}
