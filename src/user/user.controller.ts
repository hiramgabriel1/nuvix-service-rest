import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginDto } from './dto/user.login.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @Post('/auth-login')
  authUser(@Body() userLogin: LoginDto) {
    return this.userService.userLogin(userLogin);
  }

  @UseGuards(AuthGuard)
  @Post('/auth-logout')
  logout(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      this.userService.blackListAdd(token);
    }
    return { message: 'Logged out successfully' };
  }

  @Get('/show-users')
  show() {
    return this.userService.showUsers();
  }

  @Delete('/delete/:userId')
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.removeUser(userId);
  }
}
