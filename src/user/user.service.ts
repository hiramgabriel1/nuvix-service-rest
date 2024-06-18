import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/email/dto/email.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  private blackList = new Set<string>();

  showUsers() {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  async isUserExists(user: CreateUserDto) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });
  }

  async addUser(user: CreateUserDto) {
    const { email } = user;
    const userExists = await this.isUserExists(user);
    const emailDto: EmailDto = { email };

    const confirmationEmail = await this.emailService.sendMail(emailDto);

    if (userExists) throw new BadRequestException('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const dataUser = {
      ...user,
      password: hashedPassword,
    };

    if (confirmationEmail) {
      return this.prisma.user.create({
        data: dataUser,
      });
    }

    return 'no se ha enviado el email';
  }

  async userLogin(userLogin: any) {
    try {
      const userFindToLogin = await this.prisma.user.findUnique({
        where: {
          email: userLogin.email,
        },
      });

      if (!userFindToLogin)
        throw new UnauthorizedException('Usuario no existe');

      const isPasswordValid = await bcrypt.compare(
        userLogin.password,
        userFindToLogin.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      //   retornar mas informacion aqui
      const payload = {
        userId: userFindToLogin.id,
        name: userFindToLogin.username,
        email: userFindToLogin.email,
        roleUser: userFindToLogin.role,
      };

      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  blackListAdd(token: string) {
    this.blackList.add(token);
  }

  hasBlackList(token: any): boolean {
    return this.blackList.has(token);
  }
}
