import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginDto } from './dto/user.login.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('user/create-user')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @Post('user/auth-login')
  authUser(@Body() userLogin: LoginDto) {
    return this.userService.userLogin(userLogin);
  }

  @UseGuards(AuthGuard)
  @Post('user/auth-logout')
  logout(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      this.userService.blackListAdd(token);
    }
    return { message: 'Logged out successfully' };
  }

  @Get('users')
  show() {
    return this.userService.showUsers();
  }
}
