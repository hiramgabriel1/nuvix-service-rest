import * as nodemailer from 'nodemailer';
import { envs } from 'src/config/config';

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: envs.email_provider,
        pass: envs.email_password_provider,
    },
    tls: {
        rejectUnauthorized: false,
    },
    debug: true,
});

transporter.verify((error, success) => {
    error
        ? console.error(`error SMTP transporter ${error}`)
        : console.log('ready to send emails!');
});
