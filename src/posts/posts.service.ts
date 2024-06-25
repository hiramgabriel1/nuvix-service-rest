import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CandidatesList, WorkPost } from '@prisma/client';
import { UpdatePostDto } from './dto/post.update.dto';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  async validateIfUserExists(userId: number) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!findUser) throw new BadRequestException('no existe el usuario');

    return true;
  }

  async validatePostUser(userId: number, postId: number): Promise<WorkPost> {
    const findPost = await this.prisma.workPost.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!findPost)
      throw new BadGatewayException('No existe el post para el usuario');

    return findPost;
  }

  async createPostUser(
    userId: number,
    postCreated: CreatePostDto,
  ): Promise<WorkPost> {
    const validateUser = await this.validateIfUserExists(userId);

    if (!validateUser) throw new BadRequestException('error al crear el post');

    return this.prisma.workPost.create({
      data: {
        authorId: userId,
        ...postCreated,
      },
    });
  }

  async showPosts() {
    const posts = await this.prisma.workPost.findMany({
      include: {
        author: true,
      },
    });
    return {
      totalPosts: posts.length,
      post: posts,
    };
  }

  showPagePosts(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return this.prisma.workPost.findMany({
      take: limit,
      skip: skip,
      include: {
        author: true,
      },
      // orderBy: { createdAt: 'desc' }
    });
  }

  async editPost(
    postId: number,
    userId: number,
    newContentPost: UpdatePostDto,
  ): Promise<{ message: string; updatedPost: WorkPost }> {
    await this.validatePostUser(userId, postId);
    const updatedData = await this.prisma.workPost.update({
      where: {
        id: postId,
      },
      data: newContentPost,
    });

    return {
      message: `updated data ${updatedData.id}`,
      updatedPost: updatedData,
    };
  }

  async removePost(
    postId: number,
    userId: number,
  ): Promise<{ message: string; removedData: WorkPost }> {
    await this.validatePostUser(userId, postId);
    const removedData = await this.prisma.workPost.delete({
      where: {
        id: postId,
      },
    });

    return {
      message: 'eliminado exitosaente',
      removedData: removedData,
    };
  }

  async viewCandidatesToMyPosts(
    postId: number,
    userId: number,
  ): Promise<WorkPost> {
    const myPosts = await this.prisma.workPost.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
      include: {
        candidatesLists: true,
        _count: true,
        // author: true
      },
    });

    return myPosts;
  }

  async viewMyPostulates(userId: number) {
    const validateUser = await this.validateIfUserExists(userId);

    if (!validateUser) throw new BadRequestException('el usuario no existe');

    const myPostulates = await this.prisma.candidatesList.findMany({
      where: {
        id: userId,
      },
      include: {
        workPostulated: true,
      },
    });

    if (!myPostulates)
      throw new BadRequestException('no habeis postulado a ninguna parte');

    return myPostulates;
  }

  async viewMyPosts(userId: number): Promise<WorkPost | CandidatesList | any> {
    const validateUser = await this.validateIfUserExists(userId);

    if (!validateUser)
      throw new BadRequestException('error al buscar tus posts');

    return this.prisma.workPost.findMany({
      where: {
        id: userId,
      },
      include: {
        candidatesLists: true,
        _count: true,
      },
    });
  }
}
