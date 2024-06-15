import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    showUsers() {
        return this.prisma.user.findMany();
    }

    async isUserExists(user: CreateUserDto) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ email: user.email }, { username: user.username }],
            },
        });
    }

    async addUser(user: CreateUserDto): Promise<User> {
        const userExists = await this.isUserExists(user);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const dataUser = {
            ...user,
            password: hashedPassword,
            createdAt: new Date(),
        };

        if (userExists) throw new BadRequestException('el usuario ya existe de pana');

        return this.prisma.user.create({
            data: { ...dataUser },
        });
    }
}
