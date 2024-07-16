import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EmailService, PrismaService],
})

export class EmailModule {}