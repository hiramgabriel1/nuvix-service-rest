import { BadRequestException, Injectable } from '@nestjs/common';
import { PostSaves, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsSavesService {
    constructor(
        private prisma: PrismaService
    ){}

    async validatePost(postId: number, userId: number){
        const searchPost = await this.prisma.postSaves.findUnique({
            where: {
                id: postId
            }
        })

        if(!searchPost) throw new BadRequestException('the post dont exists')

        return searchPost
    }

    async addPostToMyList(postId: number, userId: number): Promise <PostSaves> {
        const validation = await this.validatePost(postId, userId)

        return
    }

    async removePostLists(){}
}
