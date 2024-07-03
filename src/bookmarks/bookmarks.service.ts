import {
    BadRequestException,
    HttpCode,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Bookmarks, Posts, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorMessage } from 'src/common/error.message';
// import { type BAD_REQUEST } from 'apicustomerrors';

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

    async validatePost(postId: number): Promise<Posts | boolean> {
        const searchPost = postId
            ? await this.prisma.posts.findFirst({
                where: {
                    id: postId,
                },
            })
            : false;

        if (!searchPost) 
            throw new BadRequestException('the post dont exists');

        return true;
    }

    async myBookmarksSaved(userId: number): Promise<Bookmarks[]> {
        const findUser = await this.validateUser(userId);

        if (!findUser) throw new BadRequestException('el usuario no existe');

        const bookmarksFinded = await this.prisma.bookmarks.findMany({
            where: {
                userId: userId,
            },
        });

        return bookmarksFinded;
    }

    async addPostToMyList(
        postId: number,
        userId: number,
    ): Promise<Bookmarks | string> {
        const validation = await this.validatePost(postId);

        if (validation) {
            const existingBookmark = await this.prisma.bookmarks.findFirstOrThrow({
                where: {
                    idPost: postId,
                    userId: userId,
                },
            });

            if (existingBookmark)
                throw new HttpException(
                    'posts already is saved',
                    HttpStatus.BAD_REQUEST,
                );

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

        if (!findUser) throw new BadRequestException(`${userId} user is not found`);

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
