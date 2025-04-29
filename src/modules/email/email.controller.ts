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
}