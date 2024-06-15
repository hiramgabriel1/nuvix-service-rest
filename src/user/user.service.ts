import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { example } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(username: string): Promise<example> {
        return this.prisma.example.create({
            data: {
                username: username.toString(), 
            },
        });
    }
}