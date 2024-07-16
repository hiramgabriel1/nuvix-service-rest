import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { transporter } from 'src/common/email.config';
import { envs } from 'src/config/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  async sendMeEmail(emailDto: EmailDto) {
    return transporter.sendMail({
      from: '"No Reply <no-reply@example.com>"',
      to: envs.my_email,
      subject: `Tienes un nuevo usuario: ${emailDto.email}`,
      text: `Un nuevo usuario se ha registrado con el email: ${emailDto.email}`,
    });
  }

  async validateEmail(emailDto: EmailDto) {
    const validation = await this.prisma.user.findUnique({
      where: {
        email: emailDto.email,
      },
      select: {
        email: true,
      },
    });

    if (validation) {
      throw new ForbiddenException('El email ya estaba registrado');
    }

    return null;
  }

  async sendMail(emailDto: EmailDto, token: string) {
    await this.validateEmail(emailDto);
    console.log(emailDto.email);
    console.log(token);

    try {
      const info = await transporter.sendMail({
        from: 'No Reply <no-reply@example.com>',
        to: emailDto.email,
        subject: `Verificación de Nuvix Dev para ${emailDto.email}`,
        text: 'Por favor verifica tu cuenta de pana',
        html: `
                        <h1>Confirmacion de cuenta</h1>
                        <p>
                            Haz clic en el siguiente enlace para confirmar tu cuenta:
                        </p>
                        <a href="http://localhost:5173/auth/register/confirm?token=${token}">
                            Confirmar Cuenta
                        </a>    
                    `,
      });

      console.log('Correo enviado exitosamente', info.messageId);

      return true;
    } catch (error) {
      throw new BadRequestException('Error al enviar el email');
    }
  }
}
