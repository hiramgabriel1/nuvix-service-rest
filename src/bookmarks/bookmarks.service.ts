import { BadRequestException, Injectable } from '@nestjs/common';
import { Bookmarks, User, WorkPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorMessage } from 'src/common/error.message';
import { BAD_REQUEST } from 'apicustomerrors';

@Injectable()
export class PostsSavesService {
    constructor(private prisma: PrismaService) { }
    private errorMessage = errorMessage;

    async validateUser(userId: number): Promise<User | boolean> {
        try {
            const findUser = userId
                ? await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                })
                : false;

            if (findUser) return true;
        } catch (error) {
            console.error(`error finded: ${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

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
        const findUser = await this.validateUser(userId);

        if (!findUser) throw new BadRequestException('el usuario no existe');

        const myBookmarks = await this.prisma.user.findMany({
            where: {
                id: userId,
            },
            include: {
                Bookmarks: true,
            },
        });

        return myBookmarks;
    }

    async addPostToMyList(
        postId: number,
        userId: number,
    ): Promise<Bookmarks | string | any> {
        const validation = await this.validatePost(postId, userId);

        if (validation) {
            const saveBookmark = await this.prisma.bookmarks.create({
                data: {
                    idPost: postId,
                    userId: userId,
                },
            });

            if (!saveBookmark) return this.errorMessage;

            return saveBookmark;
        }
    }

    async removePostLists(
        postId: number,
        userId: number,
    ): Promise<{ message: string; Bookmark: Bookmarks }> {
        const findUser = await this.validateUser(userId);

        if (!findUser) throw new BAD_REQUEST(`${userId} user is not found`);

        await this.prisma.bookmarks.findFirstOrThrow({
            where: {
                id: postId,
                postSavedUser: {
                    id: userId,
                },
            },
        });

        const removeMyBookmark = await this.prisma.bookmarks.delete({
            where: {
                id: postId,
            },
        });

        return {
            message: 'bookmark is deleted',
            Bookmark: removeMyBookmark,
        };
    }
}
