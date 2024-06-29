import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePost } from './dto/update.dto';
import { Posts } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

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

    async userCreatePost(userId: number, postData: CreatePostDto) {
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

    async showPosts() {
        const allPosts = await this.prisma.posts.findMany();

        if (!allPosts) return { message: 'no se han encontrado posts' };

        return allPosts;
    }

    async deleteMyPost(userId: number, postId: number) {
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

    async editMyPost(userId: number, postId: number, newDataPost: UpdatePost) {
        const validateUser = await this.validateIfUserExists(userId);
        const validatePost = await this.prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });

        if (!validateUser) return 'error al intentar eliminar post';
        if (validatePost.creatorPostId !== userId)
            throw new UnauthorizedException('el usuario no creo el post');

        const updatePost = await this.prisma.posts.update({
            where: {
                // creatorPostId: userId,
                id: postId,
            },
            data: newDataPost,
        });

        if (!updatePost) throw new BadRequestException('error al actualizar');

        return updatePost;
    }

    async showCommentsToPosts(postId: number) {
        const validatePost = await this.validatePost(postId);

        if (validatePost) {
        }
    }

    async showOnlyMyPosts(userId: number) {
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

    async showPopularPosts() {
        const getPosts = await this.prisma.posts.findMany();
        const filterBetterPosts = getPosts.filter(
            (likes) => likes.likesCount >= 10,
        );

        return filterBetterPosts;
    }
}
