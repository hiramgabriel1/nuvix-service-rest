import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { CandidatesListModule } from './candidates-list/candidates-list.module';
import { ChatModule } from './chat/chat.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';
import { CandidatesListController } from './candidates-list/candidates-list.controller';
import { PostsController } from './posts/posts.controller';
import { ProfileService } from './profile/profile.service';
import { CandidatesListService } from './candidates-list/candidates-list.service';
import { PostsService } from './posts/posts.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    UserModule,
    PrismaModule,
    PostsModule,
    CandidatesListModule,
    ProfileModule,
    ChatModule,
  ],
  controllers: [
    UserController,
    ProfileController,
    CandidatesListController,
    PostsController,
    ChatController,
  ],
  providers: [
    UserService,
    ProfileService,
    CandidatesListService,
    PostsService,
    ChatService,
  ],
})
export class AppModule {}
