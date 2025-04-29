import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadInterface } from "src/common/interfaces/PayloadInterface.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private config:ConfigService,
        private authService:AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:'jeffersons',
        });
    }

    async validate(payload:PayloadInterface) {
        try{
            return {
                user: payload.user,
                sub:payload.sub,
            }
            
        }catch(error){
            console.log(error);
        }
    }
}