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
import { CandidatesList, WorkPost, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  private blackList = new Set<string>();

  blackListAdd(token: string) {
    return this.blackList.add(token);
  }

  hasBlackList(token: any): boolean {
    return this.blackList.has(token);
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

  async userLogin(userLogin: any): Promise<{ token: string; user: User }> {
    try {
      const userFindToLogin = await this.prisma.user.findUnique({
        where: {
          email: userLogin.email,
        },

        include: {
          workPosts: true,
        },
      });

      if (!userFindToLogin)
        throw new UnauthorizedException('Usuario no existe');

      const isPasswordValid = await bcrypt.compare(
        userLogin.password,
        userFindToLogin.password,
      );

      if (!isPasswordValid)
        throw new UnauthorizedException('Contraseña incorrecta');

      const payload: User | any = {
        id: userFindToLogin.id,
        username: userFindToLogin.username,
        avatar_url: userFindToLogin.avatar_url,
        email: userFindToLogin.email,
        skills: userFindToLogin.skills,
        descriptionLong: userFindToLogin.descriptionLong,
        about: userFindToLogin.about,
        social: userFindToLogin.social,
        workExperience: userFindToLogin.workExperience,
        ownerExperience: userFindToLogin.ownerProjectId,
        companyName: userFindToLogin.companyName,
        employmentType: userFindToLogin.employmentType,
        titleWork: userFindToLogin.titleWork,
        isCurrent: userFindToLogin.isCurrent,
        isAdminUser: userFindToLogin.isAdminUser,
        isUserPremium: userFindToLogin.isUserPremium,
        date: userFindToLogin.date,
        description: userFindToLogin.description,
        titleProject: userFindToLogin.titleProject,
        descriptionProject: userFindToLogin.descriptionProject,
        workSkills: userFindToLogin.workSkills,
        role: userFindToLogin.role,
        createdAt: userFindToLogin.createdAt,
        password: userFindToLogin.password,
        workPosts: userFindToLogin.workPosts,
      };

      return {
        token: await this.jwtService.signAsync(payload),
        user: payload,
      };
    } catch (error) {
      throw new BadRequestException(`new error: ${error.message}`);
    }
  }

  async showUsers(): Promise<{ message: string; posts: CandidatesList } | any> {
    const workPosts = await this.prisma.user.findMany({
      include: {
        workPosts: {
          include: {
            candidatesLists: true,
          },
        },
        Posts: true,
        Bookmarks: true,
        candidatesLists: true,
        comments: true,
        CommentsPostsNormal: true,
        myReports: true,
      },
    });

    if (!workPosts) return { message: 'no hay posts que mostrar' };

    return workPosts;
  }
}
