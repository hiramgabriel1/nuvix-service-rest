import * as nodemailer from "nodemailer";
import { envs } from "src/config/config";

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: envs.email_provider,
    pass: envs.email_password_provider,
  },
});

transporter.verify().then(() => {
  console.log('ready for send emails');
});