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
import { v4 as uuidv4 } from 'uuid';

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

    const token = uuidv4();

    console.log(token);

    const confirmationEmail = await this.emailService.sendMail(emailDto, token);

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
      const userFindToLogin = await this.prisma.user.findFirstOrThrow({
        where: {
          email: userLogin.email,
        },
        include: {
          workPosts: true,
          Bookmarks: true,
          comments: true,
          CommentsPostsNormal: true,
          myReports: true,
          Posts: true,
          candidatesLists: true,
          _count: true,
        },
      });

      if (!userFindToLogin) throw new BadRequestException('Usuario no existe');

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
        bookmarks: userFindToLogin.Bookmarks,
        comments: userFindToLogin.comments,
        commentsPostNormal: userFindToLogin.CommentsPostsNormal,
        myReports: userFindToLogin.myReports,
        myPosts: userFindToLogin.Posts,
        candidatesList: userFindToLogin.candidatesLists,
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

  async removeUser(userId: number) {
    await this.prisma.workPost.deleteMany({
      where: {
        authorId: userId,
      },
    });

    await this.prisma.posts.deleteMany({
      where: {
        creatorPostId: userId,
      },
    });

    await this.prisma.comments.deleteMany({
      where: {
        creatorId: userId,
      },
    });

    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
