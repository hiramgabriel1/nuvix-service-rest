import { Module } from '@nestjs/common';
import { BetaService } from './beta.service';
import { BetaController } from './beta.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BetaController],
  providers: [BetaService, PrismaService],
})
export class BetaModule {}
