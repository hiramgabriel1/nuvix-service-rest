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
import { ReportsModule } from './reports/reports.module';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MatchsModule } from './matchs/matchs.module';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';
import { MatchsController } from './matchs/matchs.controller';
import { MatchsService } from './matchs/matchs.service';
import { PostsSavesModule } from './bookmarks/bookmarks.module';
import { PostsSavesService } from './bookmarks/bookmarks.service';
import { PostsSavesController } from './bookmarks/bookmarks.controller';

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
    ReportsModule,
    EmailModule,
    NotificationsModule,
    MatchsModule,
    PostsSavesModule,
  ],
  controllers: [
    UserController,
    ProfileController,
    CandidatesListController,
    PostsController,
    ChatController,
    EmailController,
    ReportsController,
    NotificationsController,
    MatchsController,
    PostsSavesController,
  ],
  providers: [
    UserService,
    ProfileService,
    CandidatesListService,
    PostsService,
    ChatService,
    EmailService,
    ReportsService,
    NotificationsService,
    MatchsService,
    PostsSavesService,
  ],
})
export class AppModule {}
