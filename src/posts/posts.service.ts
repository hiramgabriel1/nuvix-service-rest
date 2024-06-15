import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async validatePostData() { }

    async createPostUser(userId: number, postCreated: CreatePostDto) {
        return {
            id: userId,
            post: postCreated,
        };
    }

    // pagination posts with query
    async showPosts() { }

    async editPost() { }

    async removePost() { }
}
