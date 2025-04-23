import { Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller('email')
export class EmailController{
    constructor(private emailService:EmailService){}

    @Post('enviar')
    async email(): Promise<void>{
        return this.emailService.emailToEnd();
    }
}