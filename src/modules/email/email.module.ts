import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { ConfigModule, ConfigType } from "@nestjs/config";
import emailConfig from "src/common/config/email.config";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [emailConfig],
            envFilePath: '.env',
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [emailConfig.KEY],
            useFactory: (config: ConfigType<typeof emailConfig>) => ({
                transport: {
                    service: config.service,
                    auth: {
                        user: config.auth.user,
                        pass: config.auth.pass
                    },
                    default: {
                        from: config.default
                    },
                },
            }),
        }),
    ],
    controllers:[EmailController],
    providers: [EmailService]
})

export class EmailModule{}