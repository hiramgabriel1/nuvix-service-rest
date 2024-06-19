import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MatchsController],
  providers: [MatchsService, PrismaService],
})
export class MatchsModule {}
