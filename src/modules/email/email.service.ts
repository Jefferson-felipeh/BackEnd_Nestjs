import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RepositoryUser } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService {
 
  constructor(
    private sendEmailService:MailerService,
    private userRepo:RepositoryUser,
    private jwtService:JwtService
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

  async sendEmailForgotPassword(email:string,token:string):Promise<object>{
    try{
      //Envia um email para o usuário, passando a URL com o token_
      const sendOptions = {
        to: email,
        from: 'jeffersonthm1@gmail.com',
        subject: 'Forgot Password',
        html:  `<a href="http://localhost:4200/reset-password?token=${token}">Reset Password clicked this link</a>`,
        text: `Alterar senha clicando no link`
      }
      return this.sendEmailService.sendMail(sendOptions);
    }catch(error){
      throw new HttpException(error,400);
    }
  }

  async forgotPassword(email:string):Promise<string>{
    try{
      //O service ira validar se o email foi mandado pelo controller_
      if(!email) throw new HttpException('Email não fornecido!!',401);
  
      //Irá buscar por um usuário no banco que tenha esse email_
      const user = await this.userRepo.searchUserToEmail(email);
      
      //Se não houver um usuário com esse email, ele çança uma exceção_
      if(!user) throw new HttpException('Usuário não encontrado!',400);
      console.log(user.id);

      //Se o usuário for valido, ele gera um token JWT apartir das informações do usuário dono do email_
      const jwtToken = this.jwtService.sign(
        {sub: user.id},//Especificando e criando o token com as informações do usuário obtidas pelo email;
        {secret: 'jeffersons',expiresIn: '1h'}//Com um tempo de expiração;
      );
  
      //Após gerar o token, ele envia para o método responsável por enviar o email para este usuário com as informações contendo o email e o token_
      //O token será passado na URL para redefinir a senha_
      const sendEmail = await this.sendEmailForgotPassword(email,jwtToken);
  
      //Verifica se o email foi enviado_
      if(!sendEmail) throw new HttpException('Erro ao enviar email',400);
  
      //Por fim, ele retornar informando que o email foi enviado_
      return 'email para redefinição de senha enviado!';
    }catch(error){
      throw new HttpException(error,400);
    }
  }
}