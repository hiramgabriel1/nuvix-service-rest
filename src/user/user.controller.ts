import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginDto } from './dto/user.login.dto';

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

  @Get('users')
  show() {
    return this.userService.showUsers();
  }
}
