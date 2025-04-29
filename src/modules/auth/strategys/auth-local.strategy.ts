import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService:AuthService){
        super({
            usernameField:'email',
            passwordField:'password'
        });
    }

    async validate(email:string,password:string){
        try{
            const authUser = await this.authService.signIn(email,password);
            if(!authUser) throw new UnauthorizedException();
            // console.log(authUser);
            return authUser;
        }catch(error){
            console.log(error);
        }
    }
}