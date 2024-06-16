import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    // validar si el post ya existe en el perfil del usuario
    // async validatePostData(userId: number) {
    //     return this.prisma.user.findMany({
    //         where: {
    //             id: userId
    //         }
    //     })
    // }

    async createPostUser(userId: number, postCreated: CreatePostDto) {
        // const validatePostUser = await this.validatePostData(userId)

    }

    // pagination posts with query
    async showPosts() { }

    async editPost() { }

    async removePost() { }
}
