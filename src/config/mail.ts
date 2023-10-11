import nodemailer from 'nodemailer'
import Env from './env';

export const transporter = nodemailer.createTransport({
    host: Env.SMTP_HOST,
    port: Number(Env.SMTP_PORT),
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: Env.SMTP_USER,
      pass: Env.SMTP_PASSWORD,
    },
  });

  // To Send an Email

  export const sendEmail=async(
    to:string,
    subject:string,
    html:string,
  ):Promise<string | null> =>{
    const info =await transporter.sendMail({
        from:Env.SMTP_FROM,
        to:to,
        subject:subject,
        html:html,
    })
    return info?.messageId
  }