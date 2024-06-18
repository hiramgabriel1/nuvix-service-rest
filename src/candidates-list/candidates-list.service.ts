import {
    BadGatewayException,
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { CandidatesList, Post, User } from '@prisma/client';
import { any } from 'joi';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesListService {
    constructor(private prisma: PrismaService) { }

    async validatePostApplication(postId: number): Promise<Post | boolean> {
        const postSearch = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!postSearch) throw new BadGatewayException('no existe el post');

        return true;
    }

    async validateUserApplication(userId: number): Promise<User | boolean> {
        let validateIfUserExists = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (validateIfUserExists) return true;

        throw new BadRequestException('el usuario no existe');
    }

    async sendApplication(
        userId: number,
        postId: number,
    ): Promise<CandidatesList> {
        const userValidation = await this.validateUserApplication(userId);
        const postValidation = await this.validatePostApplication(postId);

        if (!(userValidation && postValidation))
            throw new BadGatewayException('error al intentar postular');

        const postulatePerson = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        // @ts-ignore
        const postulateToProject: CandidatesList = {
            username: postulatePerson.username,
            descriptionLong: postulatePerson.descriptionLong,
            workId: postId,
            // id: 1
        };

        const postPostulate = await this.prisma.candidatesList.createMany({
            data: {
                ...postulateToProject,
            },
        });

        if (!postPostulate)
            throw new BadRequestException('error al hacer la postulacion');

        return postulateToProject;
    }

    async approvePostulate() { }

    async declinePostulate() { }

    async showListPostulates() {
        // const postulates = await this.prisma.post.findMany({
        //     include: {
        //         CandidatesList: true,
        //         author: true,
        //         _count: true
        //     }
        // })
        // return postulates
        // const filterPostulates = postulates
        // return this.prisma.post.findMany({
        //     include: {
        //         CandidatesList: true,
        //         author: true,
        //         _count: true,
        //     },
        // });
        // regresar los postulantes dependiendo el usuario y sus posts, tenemos que validar eso
    }

    async myCompanions() { }

    async filterPostulates() { }
}
