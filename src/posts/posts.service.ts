import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async createPostUser(userId: any, postCreated: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                ...postCreated,
                authorId: parseInt(userId),
            },
        });
    }

    // pagination posts with query
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

    async editPost() { }

    async removePost() { }
}
