import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserBetaDto } from './dto/addUserBeta.dto';
import { UserBeta } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BetaService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService,
    ) { }

    public async userExists(userEmail: string): Promise<boolean> {
        const findUser = await this.prisma.userBeta.findFirst({
            where: {
                email: userEmail,
            },
        });

        console.log(`userExists - User found: ${!!findUser}`);

        return !!findUser;
    }

    public async addUserBeta(userBeta: UserBetaDto): Promise<UserBeta | Object> {
        const userFinded = await this.userExists(userBeta.email);

        console.log(userBeta);

        if (userFinded) throw new BadRequestException('User already exists');

        const saveUser = await this.prisma.userBeta.create({
            data: userBeta,
        });

        console.log(`addUserBeta - User created:`, saveUser);

        // todo: send email to confirmation account

        return {
            response: saveUser,
            sendMail: await this.emailService.betaEmailsUser(userBeta.email)
        };
    }

    public async checkStatusUser(isAccepted: boolean): Promise<'strin'> {
        console.log(isAccepted);

        return;
    }

    public async updateUserStatus(
        userId: number,
        isAccepted: boolean,
    ): Promise<UserBeta | Object> {
        const findUser = await this.prisma.userBeta.findFirst({
            where: { id: userId },
        });

        if (!findUser)
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

        const updateUser = await this.prisma.userBeta.update({
            where: { id: userId },
            data: { isAccepted: { set: isAccepted } },
        });

        return {
            response: updateUser,
            sendMail: await this.checkStatusUser(updateUser.isAccepted)
        };
    }

    public showUsersCandidates(): Promise<UserBeta[]> {
        return this.prisma.userBeta.findMany({
            where: { isAccepted: true },
        });
    }

    public showUsers(): Promise<UserBeta[]> {
        return this.prisma.userBeta.findMany();
    }

    public async deleteUser(userId: number) {
        return this.prisma.userBeta.delete({
            where: {
                id: userId,
            },
        });
    }
}
