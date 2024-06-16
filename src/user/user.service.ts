import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    showUsers() {
        return this.prisma.user.findMany({
            include: { posts: true },
        });
    }

    async isUserExists(user: CreateUserDto) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ email: user.email }, { username: user.username }],
            },
        });
    }

    async addUser(user: CreateUserDto) {
        const userExists = await this.isUserExists(user);

        if (userExists) {
            throw new BadRequestException('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const dataUser = {
            ...user,
            password: hashedPassword,
            // createdAt: new Date(),
        };

        return this.prisma.user.create({
            data: dataUser,
        });
    }
}
