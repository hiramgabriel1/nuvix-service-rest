import { BadRequestException, Injectable } from '@nestjs/common';
import { CandidatesList, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesListService {
    constructor(private prisma: PrismaService) { }

    async validateUserApplication(userId: number): Promise<User> {
        let validateIfUserExists = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (validateIfUserExists) return validateIfUserExists;

        throw new BadRequestException('el usuario no existe');
    }

    async sendApplication(userId: number, postId: number) {
        await this.validateUserApplication(userId);

        // necesitamos validar al usuario que quiere postular
    }

    async approvePostulate() { }

    async declinePostulate() { }

    async showListPostulates() {
        // regresar los postulantes dependiendo el usuario y sus posts, tenemos que validar eso
    }
}
