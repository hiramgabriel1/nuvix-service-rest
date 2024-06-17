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
    constructor(private prisma: PrismaService) { }

    async sendMeEmail(emailDto: EmailDto) {
        return transporter.sendMail({
            from: envs.email_provider,
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

    async sendMail(emailDto: EmailDto) {
        await this.validateEmail(emailDto);

        try {
            await transporter.sendMail({
                from: `DevFinder <${envs.email_provider}>`,
                to: emailDto.email,
                subject: `Verificación de DevFinder para ${emailDto.email}`,
                text: 'Por favor verifica tu cuenta de pana',
                html: '<b>Verificación en espera</b>',
            });

            console.log('Correo enviado exitosamente');

            // si el usuario confirma su email retornamos true y me enviamos un email
            // await this.sendMeEmail(emailDto);

            return true;
        } catch (error) {
            throw new BadRequestException('Error al enviar el email');
        }
    }
}
