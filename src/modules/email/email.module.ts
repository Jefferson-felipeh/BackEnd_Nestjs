import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { ConfigModule, ConfigType } from "@nestjs/config";
import emailConfig from "src/common/config/email.config";
import { MailerModule } from "@nestjs-modules/mailer";
import { User } from "../users/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryUser } from "../users/users.repository";
import { RepositoryAddress } from "../address/address.repository";
import { Role } from "../role/entities/Role.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User,Role]),
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
        JwtModule
    ],
    controllers:[EmailController],
    providers: [
        EmailService,
        RepositoryUser,
        JwtService
    ]
})

export class EmailModule{}