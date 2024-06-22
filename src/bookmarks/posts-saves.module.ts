import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/config';
import { PostsSavesController } from './posts-saves.controller';
import { PostsSavesService } from './posts-saves.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.secret_key,
      signOptions: { expiresIn: "24h" }
    })
  ],
  controllers: [PostsSavesController],
  providers: [PostsSavesService, PrismaService],
})

export class PostsSavesModule {}

// banana bluebarry