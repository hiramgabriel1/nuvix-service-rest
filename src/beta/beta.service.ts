import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserBetaDto } from './dto/addUserBeta.dto';
import { UserBeta } from '@prisma/client';

@Injectable()
export class BetaService {
    constructor(private prisma: PrismaService) { }

    public async userExists(
        userEmail: string,
    ): Promise<boolean> {
        const findUser = await this.prisma.userBeta.findFirst({
            where: {
                email: userEmail
            },
        });

        return !!findUser;
    }

    public async addUserBeta(userBeta: UserBetaDto): Promise<UserBeta> {
        const userFinded = await this.userExists(userBeta.email);

        if (userFinded) 
            throw new BadRequestException('User already exists');

        return this.prisma.userBeta.create({
            data: { ...userBeta },
        });
    }

    public async updateUserStatus(
        userId: number,
        isAccepted: boolean,
    ): Promise<UserBeta[] | Object> {
        const findUser = await this.prisma.userBeta.findFirst({
            where: {
                id: userId
            }
        })

        if (!findUser)
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

        return this.prisma.userBeta.update({
            where: { id: userId },
            data: { isAccepted: isAccepted },
        });
    }

    public showUsersCandidates(): Promise<UserBeta[]> {
        return this.prisma.userBeta.findMany({
            where: { isAccepted: true },
        });
    }

    public showUsers(): Promise<UserBeta[]> {
        return this.prisma.userBeta.findMany();
    }
}
