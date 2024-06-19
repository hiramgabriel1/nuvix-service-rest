import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.secret_key,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService],
})
export class ReportsModule { }
