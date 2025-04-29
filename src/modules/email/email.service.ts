import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
 
  constructor(private sendEmailService:MailerService){}
  
  async emailToEnd() {
    const mailOptions = {
        to: 'alvarom@petribusa.com.br',//Para quem será enviado o email;
        from: 'jeffersonthm1@gmail.com',//Quem irá enviar o email;
        template: '',//Template que o email terá;
        subject: 'Testing Nest MailerModule',
        text: 'Este email foi enviado como teste!',
        html: '<b style="color: red; font-weight:bold;">Bom diah, lindo!!</b>'
    };

    return await this.sendEmailService.sendMail(mailOptions);
  }

  async sendEmailDynamic(to:string, name:string){
    const sendOptions = {
      to,
      from: 'jeffersonthm1@gmail.com',
      subject: 'Bem-Vindo!',
      template: `<div style="display:flex; justify-content:center;align-items:center; border: 1px solid #000"><h1 style="font-size:22px">Bem vindo,</h1><strong>${name}</strong></div>`,
      text: `<div style="display:flex; justify-content:center;align-items:center; border: 1px solid #000"><h1 style="font-size:22px">Bem vindo,</h1><strong>${name}</strong></div>`,
      context:{name}
    }

    return this.sendEmailService.sendMail(sendOptions);
  }
}