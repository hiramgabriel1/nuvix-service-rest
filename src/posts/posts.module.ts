import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.secret_key,
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
