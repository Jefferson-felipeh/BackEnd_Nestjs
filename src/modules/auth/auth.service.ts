import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../users/dtos/Userdto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthResponseInterface } from './interfaces/auth-response.interface';
import { PayloadInterface } from 'src/common/interfaces/PayloadInterface.interface';

@Injectable()
export class AuthService {

    /*Para gerar tanto o AccessToken, quanto o RefleshToken, terei que ter acesso aos valores das variaveis globais,
    como secret, expiresIn(access e reflash), e já que elas estão centralizadas e configuradas no namespace, basta chamar o namespace nesse service_
    */

    constructor(
        private repository:AuthRepository,
        private jwtService:JwtService,
        @Inject(jwtConfig.KEY)
        private jwtConfigProperties:ConfigType<typeof jwtConfig>
    ){}

    async signIn(email:string,password:string):Promise<object>{
        if(!email && !password) throw new HttpException('As credenciais são importantes!',400);
        
        try{
            //Verificando se o usuário existe apartir do email fornecido_
            const user = await this.repository.isEmailExists(email);
            if(!user) throw new HttpException('Erro nos dados das credenciais!',400);

            //Verificar as senhas_
            const isVerifyPassword = await this.passwordCompare(password,user.password);
            if(!isVerifyPassword) throw new HttpException('Senha Incorreta!',401);
            
            //Retornando o Token de autorização_
            const tokens = this.generateTokens(user);

            return {
                Auth: {
                    AccessToken: tokens.accessToken,
                    ReflashToken: tokens.reflashToken
                },
                user: user,
            };

        }catch(error){
            throw new HttpException(error,401);
        }
    }

    async passwordCompare(passwordReq:string,passwordHash:string):Promise<boolean>{
        if(!passwordReq && !passwordHash) throw new HttpException('Erro ao obter senhas para comparação!',400);

        const verifyPassword = await bcrypt.compare(passwordReq,passwordHash);

        if(!verifyPassword) throw new HttpException('Senha Incorreta!',401);

        return verifyPassword;
    }

    //Gerando o payload_
    generatePayload(user:UserDto):PayloadInterface{
        return {
            user:user.email,
            sub:user.id,
        };
    }

    //Gerando o AccessToken_
    generateAccessToken(payload:PayloadInterface):string{
        return this.jwtService.sign(payload,{
            secret: this.jwtConfigProperties.secret,//Sempre passamos as propriedades secret e expiresIn para geração dos tokens;
            expiresIn: this.jwtConfigProperties.access.signOptions?.expiresIn
        });
    }

    //Gerando o ReflashToken_
    generateReflashToken(payload:PayloadInterface):string{
        return this.jwtService.sign(payload,{
            secret: this.jwtConfigProperties.secret,
            expiresIn: this.jwtConfigProperties.reflash.signOptions?.expiresIn
        });
    }

    //Retornando os dois tokens_
    generateTokens(user:UserDto):AuthResponseInterface{
        const payload = this.generatePayload(user);
        const accessToken = this.generateAccessToken(payload);
        const reflashToken = this.generateReflashToken(payload);

        return {
            accessToken,
            reflashToken
        }
    }

    //Validando o token_
    validToken(token){
        if(!token) throw new HttpException('Erro ao obter token!',401);
        return true;
    }
}
