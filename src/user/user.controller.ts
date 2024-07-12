import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginDto } from './dto/user.login.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

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

  @UseGuards(AuthGuard)
  @Get('/auth/user')
  async user(@Req() request: Request) {
    try {
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') 
          throw new UnauthorizedException('Please provide token');

      const authToken = authorization.replace(/bearer/gim, '').trim();
      const data = await this.jwtService.verify(authToken, {
        secret: envs.secret_key,
      });

      console.log(data);
      console.log(data.id);
      
      if (!data || !data.id) 
        throw new UnauthorizedException('Invalid JWT token');

      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          id: data.id,
        },
      });

      if (!user) throw new UnauthorizedException('User not found');

      const { password, ...result } = user;
      console.log(result);

        return result;
    } catch (error) {
      console.log(error);
      
      throw new UnauthorizedException('Invalid token or user not found');
    }
  }

  // @UseGuards(AuthGuard)
  @Get('/show-users')
  show() {
    return this.userService.showUsers();
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:userId')
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.removeUser(userId);
  }
}