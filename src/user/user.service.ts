import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async isUserExists(user: CreateUserDto) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: user.email },
                    { username: user.username },
                ],
            },
        });
    }

    async addUser(user: CreateUserDto): Promise<User> {
        let userExists = await this.isUserExists(user);

        console.log(userExists);

        if (userExists) throw new BadRequestException('el usuario ya existe de pana');

        return this.prisma.user.create({
            data: {
                ...user,
                createdAt: new Date(),
            },
        });
    }
}
