import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail', // ou smtp
    auth: {
      user: 'jeffersonthm1@gmail.com',
      pass: 'uigongpjwrvhtclo'
    },
  });

  async emailToEnd() {
    const mailOptions = {
        to: 'jeffersons@petribusa.com.br',
        from: 'jeffersonthm1@gmail.com',
        subject: 'Testing Nest MailerModule',
        text: 'Este email foi enviado como teste!',
        html: '<b>Texto enviado via nestjs!</b>'
    };

    return await this.transporter.sendMail(mailOptions);
  }
}