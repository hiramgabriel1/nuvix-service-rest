import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }
}