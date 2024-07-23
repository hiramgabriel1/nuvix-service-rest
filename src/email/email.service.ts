import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { transporter } from 'src/common/email.config';
import { envs } from 'src/config/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentMessageInfo, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) { }

  async betaEmailsUser(email: string) {
    return transporter.sendMail({
      from: '"Nuvix Dev" <no-reply@nuvixdev.com>',
      to: email,
      subject: 'Nuvix Dev | Invitación para ser Beta Tester',
      text: '¡Hola!\n\nGracias por tu interés en Nuvix Dev. Recibirás un correo en caso de ser seleccionado como beta tester. Mientras tanto, te agradecemos que compartas este proyecto con tus amigos.\n\n¡Gracias y esperamos contar contigo!\n\nEl equipo de Nuvix Dev',
    });
  }

  public async notifyUser(
    isAccepted: boolean,
    userEmail: string,
  ): Promise<void | SentMessageInfo> {
    const subject = isAccepted
      ? '¡Bienvenido a Nuvix Dev Beta'
      : 'Actualización de tu solicitud para tester de Nuvix Dev';

    const text = isAccepted
      ? 'Felicidades! Has sido aceptado como beta tester de Nuvix Dev 🥵. Pronto recibirás más detalles sobre cómo empezar a probar nuestra aplicación. ¡Gracias por tu interés y apoyo!'
      : 'Gracias por tu interés en ser beta tester de Nuvix. Lamentablemente, en esta ocasión no has sido seleccionado asi como tu ex no te seleccionó 😢. Esperamos contar contigo en futuras oportunidades. ¡Gracias por tu comprensión!';

    const sendNotifyUser = await transporter.sendMail({
      from: '"No reply <no-reply@example.com>"',
      to: userEmail,
      subject: subject,
      text: text,
    });

    console.log(sendNotifyUser);

    return sendNotifyUser;
  }

  public async sendMeEmail(emailDto: EmailDto) {
    return transporter.sendMail({
      from: '"No Reply <no-reply@example.com>"',
      to: envs.my_email,
      subject: `Tienes un nuevo usuario: ${emailDto.email}`,
      text: `Un nuevo usuario se ha registrado con el email: ${emailDto.email}`,
    });
  }

  public async validateEmail(emailDto: EmailDto) {
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

  public async notificationEmail() { }

  public async sendMail(emailDto: EmailDto, token: string) {
    await this.validateEmail(emailDto);
    console.log(emailDto.email);
    console.log(token);

    try {
      const info = await transporter.sendMail({
        from: '"Nuvix Dev" <no-reply@nuvixdev.com>',
        to: emailDto.email,
        subject: `Verificación de Nuvix Dev para ${emailDto.email}`,
        text: 'Por favor verifica tu cuenta de pana',
        html: `
  <div class="bg-gray-200">
    <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600">
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->

    <div class="bg-gray-200 mx-auto" style="max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" class="bg-gray-200 w-full">
        <tbody>
          <tr>
            <td class="border-b-4 border-gray-800 p-5 text-center align-top"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--[if mso | IE]>
      </td>
    </tr>
    </table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600">
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->

    <div class="bg-white mx-auto" style="max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" class="bg-white w-full">
        <tbody>
          <tr>
            <td class="border border-gray-300 border-t-0 p-5 text-center align-top">
              <!--[if mso | IE]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:bottom;width:600px;">
              <![endif]-->
              <div class="text-left align-bottom w-full">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="align-bottom w-full">
                  <tr>
                    <td align="center" class="p-5">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" class="m-auto">
                        <tbody>
                          <tr>
                            <td class="w-16">
                              <img height="auto" src="https://i.imgur.com/KO1vcE9.png" class="border-0 block w-full" width="64" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5 pb-10">
                      <div class="font-sans text-4xl font-bold leading-tight text-gray-700">
                        Please confirm your email
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5 pb-0">
                      <div class="font-sans text-lg leading-tight text-gray-700">
                        Yes, we know.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5">
                      <div class="font-sans text-lg leading-tight text-gray-700">
                        An email to confirm an email. 🤪
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5 pb-5">
                      <div class="font-sans text-lg leading-tight text-gray-700">
                        Please validate your email address in order to get started using {{Product}}.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5 pt-8 pb-10">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" class="m-auto">
                        <tr>
                          <td align="center" bgcolor="#2F67F6" role="presentation" class="rounded text-white py-4 px-6">
                            <a href="http://localhost:5173/auth/register/confirm?token=${token}" style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;text-decoration:none;">
                              Confirm Your Email
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5 pb-0">
                      <div class="font-sans text-lg leading-tight text-gray-700">
                        Or verify using this link:
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5 pb-10">
                      <div class="font-sans text-lg leading-tight text-gray-700">
                        <a href="https://www.htmlemailtemplates.net/free-html-emails-for-startups" style="color:#2F67F6">https://www.htmlemailtemplates.net/free-html-emails-for-startups</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5">
                      <div class="font-sans text-2xl font-bold leading-tight text-gray-700">
                        Need Help?
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="p-5">
                      <div class="font-sans text-base leading-tight text-gray-700">
                        Please send any feedback or bug info<br> to <a href="mailto:info@example.com" style="color:#2F67F6">info@example.com</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--[if mso | IE]>
      </td>
    </tr>
    </table>
    <![endif]-->

    <div class="mx-auto" style="max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" class="w-full">
        <tbody>
          <tr>
            <td class="p-5 text-center align-top">
              <!--[if mso | IE]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:bottom;width:600px;">
              <![endif]-->
              <div class="text-left align-bottom w-full">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="w-full">
                  <tbody>
                    <tr>
                      <td class="align-bottom p-0">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="w-full">
                          <tr>
                            <td align="center" class="p-0">
                              <div class="font-sans text-sm font-light leading-tight text-gray-500">
                                Some Firm Ltd, 35 Avenue. City 10115, USA
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" class="p-5">
                              <div class="font-sans text-sm font-light leading-tight text-gray-500">
                                <a href="" style="color:#575757">Unsubscribe</a> from our emails
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
        </td>
      </tr>
    </table>
    <![endif]-->
  </div>
`,
      });

      console.log('Correo enviado exitosamente', info.messageId);

      return true;
    } catch (error) {
      throw new BadRequestException('Error al enviar el email');
    }
  }
}
