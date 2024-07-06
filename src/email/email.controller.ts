import { Controller, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // @Post('email/send/:email')
  // sendEmailConfirmation(
  //   @Param('email') email: EmailDto
  // ){  
  //   return this.emailService.sendMail(email)
  // }
}
