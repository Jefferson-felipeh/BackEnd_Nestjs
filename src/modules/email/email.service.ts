import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RepositoryUser } from '../users/users.repository';

@Injectable()
export class EmailService {
 
  constructor(
    private sendEmailService:MailerService,
    private userRepo:RepositoryUser
  ){}
  
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

  async sendEmailForgotPassword(email:string):Promise<object>{
    const sendOptions = {
      to: email,
      from: 'jeffersonthm1@gmail.com',
      subject: 'Forgot Password',
      html:  `<a href="/">Mudar senha</a>`,
      text: 'Alterar senha clicando no link'
    }

    return this.sendEmailService.sendMail(sendOptions);
  }


  async forgotPassword(email:string):Promise<string>{
    try{

      if(!email) throw new HttpException('Email não fornecido!!',401);
  
      const user = await this.userRepo.searchUserToEmail(email);
      if(!user) throw new HttpException('Usuário não encontrado!',400);
  
      const sendEmail = await this.sendEmailForgotPassword(email);
  
      if(!sendEmail) throw new HttpException('Erro ao enviar email',400);
  
      return 'email para redefinição de senha enviado!';
    }catch(error){
      throw new HttpException(error,400);
    }
  }
}