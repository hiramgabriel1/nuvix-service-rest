import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { CandidatesListModule } from './candidates-list/candidates-list.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';
import { CandidatesListController } from './candidates-list/candidates-list.controller';
import { JobsController } from './jobs/jobs.controller';
import { ProfileService } from './profile/profile.service';
import { CandidatesListService } from './candidates-list/candidates-list.service';
import { JobsService } from './jobs/jobs.service';
import { ReportsModule } from './reports/reports.module';
import { EmailModule } from './email/email.module';
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
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 70,
      },
    ]),
    UserModule,
    PrismaModule,
    JobsModule,
    CandidatesListModule,
    ProfileModule,
    ReportsModule,
    EmailModule,
    NotificationsModule,
    MatchsModule,
    PostsSavesModule,
    PostsModule,
    PaymentsModule
  ],
  controllers: [
    UserController,
    ProfileController,
    CandidatesListController,
    JobsController,
    ReportsController,
    NotificationsController,
    MatchsController,
    PostsSavesController,
    PostsController
  ],
  providers: [
    UserService,
    ProfileService,
    CandidatesListService,
    JobsService,
    EmailService,
    ReportsService,
    NotificationsService,
    MatchsService,
    PostsSavesService,
    PostsService
  ],
})
export class AppModule {}
