import { Module } from '@nestjs/common';
import { CandidatesListService } from './candidates-list.service';
import { CandidatesListController } from './candidates-list.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CandidatesListController],
  providers: [CandidatesListService, PrismaService],
})
export class CandidatesListModule {}
