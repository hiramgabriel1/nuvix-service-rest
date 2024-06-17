import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
})

export class EmailModule {}