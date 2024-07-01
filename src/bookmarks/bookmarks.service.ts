import { BadRequestException, Injectable } from '@nestjs/common';
import { Bookmarks, WorkPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorMessage } from 'src/common/error.message';

@Injectable()
export class PostsSavesService {
    constructor(private prisma: PrismaService) { }
    private errorMessage = errorMessage;

    async validatePost(postId: number, userId: number) {
        const searchPost = await this.prisma.workPost.findFirst({
            where: {
                id: postId,
            },
        });

        if (!searchPost) throw new BadRequestException('the post dont exists');

        return true;
    }

    async myBookmarksSaved(userId: number) {
        const myBookmarks = await this.prisma.user.findMany({
            where: {
                id: userId,
            },
            include: {
                Bookmarks: true,
            },
        });

        return myBookmarks
    }

    async addPostToMyList(
        postId: number,
        userId: number,
    ): Promise<Bookmarks | string | any> {
        const validation = await this.validatePost(postId, userId);

        if (validation) {
            const saveBookmark = await this.prisma.bookmarks.createMany({
                data: {
                    idPost: postId,
                },
            });

            if (!saveBookmark) return this.errorMessage;

            return saveBookmark;
        }
    }
 
    async removePostLists(postId: number, userId: number) {}
}