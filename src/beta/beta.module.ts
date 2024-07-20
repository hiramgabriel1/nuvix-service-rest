import { Module } from '@nestjs/common';
import { BetaService } from './beta.service';
import { BetaController } from './beta.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [BetaController],
  providers: [BetaService, PrismaService, EmailService],
})
export class BetaModule {}
