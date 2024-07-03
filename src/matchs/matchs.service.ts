import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CONFLICT_ERROR } from "apicustomerrors"
import cron from 'node-cron';

@Injectable()
export class MatchsService {
    constructor(private prisma: PrismaService) {}

    async findMatchsByUser() { }

    async createMatchDaily() {
        try {
            // const allUsers
        } catch (error) {
            console.error(error.message);
            throw new HttpException(
                'error in service',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
