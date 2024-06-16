import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dto/post.update.dto';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async validatePostUser(userId: number, postId: number): Promise<Post | null> {
        let findPost = await this.prisma.post.findFirst({
            where: {
                id: postId,
                authorId: userId,
            },
        });

        if (!findPost)
            throw new BadGatewayException('no existe el post para el usuario');

        return findPost;
    }

    async createPostUser(userId: any, postCreated: CreatePostDto): Promise<Post> {
        return this.prisma.post.create({
            data: {
                ...postCreated,
                authorId: parseInt(userId),
            },
        });
    }

    async showPosts() {
        const posts = await this.prisma.post.findMany({
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
        let skip = (page - 1) * limit;

        return this.prisma.post.findMany({
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
    ): Promise<Post> {
        await this.validatePostUser(postId, userId);

        return this.prisma.post.update({
            where: { id: postId },
            data: newContentPost,
        });
    }

    async removePost() { }
}
