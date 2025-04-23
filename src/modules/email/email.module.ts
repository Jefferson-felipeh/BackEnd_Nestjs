import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { emailConfig } from "src/common/config/email.config";
import { ConfigType } from "@nestjs/config";

@Module({
    imports: [],
    controllers:[EmailController],
    providers: [EmailService]
})

export class EmailModule{

}