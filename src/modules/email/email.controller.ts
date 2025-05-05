import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { emailData } from "./interfaces/emailData.interface";

@Controller('email')
export class EmailController{
    constructor(private emailService:EmailService){}

    @Post('enviar')
    async email(): Promise<void>{
        return this.emailService.emailToEnd();
    }

    @Post('send-email')
    async sendEmail(@Body() emailBody:emailData):Promise<void>{
        return this.emailService.sendEmailDynamic(emailBody.to,emailBody.name);
    }

    @Post('forgot-password')
    //O usuário clica no link forgot-password informando que ele deseja recuperar ou resetar sua senha_
    //Ele irá fornecer um email válido que esteja cadastrado no banco de dados_
    async forgotPassword(@Body() body: {email:string}):Promise<string>{
        //Obtem o email e manda para o service_
        return this.emailService.forgotPassword(body.email);
    }
}