import { Module } from '@nestjs/common';
import { CandidatesListService } from './candidates-list.service';
import { CandidatesListController } from './candidates-list.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/config';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.secret_key,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CandidatesListController],
  providers: [CandidatesListService, UserService, PrismaService],
})
export class CandidatesListModule {}
