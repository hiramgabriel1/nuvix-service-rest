import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePost } from './dto/update.dto';
import { errorMessage } from 'src/common/error.message';
import { Posts } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }
    private errorMessage: string = errorMessage;

    async validateIfUserExists(userId: number): Promise<Boolean> {
        try {
            const findUser = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });

            if (!findUser)
                throw new BadRequestException('el usuario buscado no existe');

            return true;
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error.message);
        }
    }

    async validatePost(postId: number): Promise<Boolean> {
        const findPost = await this.prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });

        if (!findPost) throw new NotFoundException('no existe el post');

        return true;
    }

    async userCreatePost(
        userId: number,
        postData: CreatePostDto,
    ): Promise<Posts | string> {
        const userFinded = await this.validateIfUserExists(userId);

        if (userFinded) {
            const dataGetted = { ...postData, creatorPostId: userId };
            const createDataPost = await this.prisma.posts.create({
                data: dataGetted,
            });

            if (createDataPost) return createDataPost;

            return 'error al crear tu post';
        }
    }

    async showPosts(): Promise<{ message: string; posts: Posts } | Object> {
        const allPosts = await this.prisma.posts.findMany();

        if (!allPosts)
            return { message: 'no se han encontrado posts', posts: null };

        return {
            message: `post showed`,
            posts: allPosts,
        };
    }

    async deleteMyPost(userId: number, postId: number): Promise<Posts> {
        const validateUser = await this.validateIfUserExists(userId);
        const validatePost = await this.validatePost(postId);

        if (validateUser && validatePost) {
            const removeMyPost = await this.prisma.posts.delete({
                where: {
                    creatorPostId: userId,
                    id: postId,
                },
            });

            if (removeMyPost) return removeMyPost;

            throw new UnauthorizedException('el usuario no creo el post');
        }
    }

    async editMyPost(
        userId: number,
        postId: number,
        newDataPost: UpdatePost,
    ): Promise<Posts[] | Object> {
        const validateUser = await this.validateIfUserExists(userId);
        const validatePost = await this.prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });

        if (!validateUser) return this.errorMessage;
        if (validatePost.creatorPostId !== userId)
            throw new UnauthorizedException('el usuario no creo el post');

        const updatePost = await this.prisma.posts.update({
            where: {
                id: postId,
            },
            data: newDataPost,
        });

        if (!updatePost) throw new BadRequestException('error al actualizar');

        return updatePost;
    }

    async paginationPosts(page: number, limit: number): Promise<Posts[]> {
        const skip = (page - 1) * limit;

        return this.prisma.posts.findMany({
            take: limit,
            skip: skip,
        });
    }

    async showCommentsToPosts(postId: number): Promise<Posts | Object> {
        const validatePost = await this.validatePost(postId);

        if (validatePost) {
            const findPost = await this.prisma.posts.findUnique({
                where: {
                    id: postId,
                },
                include: {
                    Comments: true,
                },
            });

            if (findPost) return findPost;

            return this.errorMessage;
        }
    }

    async showOnlyMyPosts(userId: number): Promise<Posts[]> {
        const user = await this.validateIfUserExists(userId);

        if (user) {
            const findMyPosts = await this.prisma.posts.findMany({
                where: {
                    creatorPostId: userId,
                },
            });

            if (!findMyPosts) throw new UnauthorizedException('el usuario no creo');

            return findMyPosts;
        }
    }

    async showPopularPosts(): Promise<Posts[]> {
        const getPosts = await this.prisma.posts.findMany();
        const filterBetterPosts = getPosts.filter(
            (likes) => likes.likesCount >= 10,
        );

        return filterBetterPosts;
    }
}
