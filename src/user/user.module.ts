import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  // imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, EmailService, PrismaService],
})
export class UserModule {}
