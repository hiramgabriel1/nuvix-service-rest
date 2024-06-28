import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePost } from './dto/update.dto';

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
            console.log(error);
            throw new BadRequestException(error.message);
        }
    }

    async validatePost(postId: number): Promise<Boolean> {
        const findPost = await this.prisma.posts.findFirst({
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
        const validatePost = await this.validatePost(postId);
        const validateUser = await this.validateIfUserExists(userId);

        if (!(validatePost && validateUser))
            return 'error al intentar eliminar post';

        const newPostData = { ...newDataPost, creatorPostId: userId };
        const updatePost = await this.prisma.posts.update({
            where: {
                id: postId,
            },
            data: newPostData,
        });

        if (!updatePost) throw new BadRequestException('error al actualizar');

        return updatePost;
    }
}
