import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User';
import { AuthLocalStrategy } from './strategys/auth-local.strategy';
import { UsersService } from '../users/users.service';
import { RepositoryUser } from '../users/users.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/common/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { AuthGuardsService } from './guards/Auth.guard';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategys/auth-Jwt.strategy';
import { Role } from '../role/entities/Role.entity';
import { Address } from '../address/entities/Address.entity';
import { RepositoryAddress } from '../address/address.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User,Role,Address]),
        
        //Determinando a chave secreta e o tempo em que o token estará ativo_
        // ConfigModule.forFeature(jwtConfig),
        //PassportModule,

        //Configurações do JwtModule_
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [jwtConfig.KEY],
          useFactory: (config: ConfigType<typeof jwtConfig>) => ({
            secret: config.secret,
            signOptions: config.access.signOptions
          })
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
        
        AuthLocalStrategy,
        JwtStrategy,

        UsersService,
        RepositoryUser,

        AuthGuardsService,
        JwtGuard,

        RepositoryAddress
    ],
})
export class AuthModule {}
