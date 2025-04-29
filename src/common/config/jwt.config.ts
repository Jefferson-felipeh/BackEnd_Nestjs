//Esse arquivo é necessário para centralizar e organizar todas as configurações relacionadas ao JWT,
//como a chave secreta, as definições de expiração para o accesstoken e o reflashtoken_

import { registerAs } from "@nestjs/config";
import { JwtConfigInterface } from "../interfaces/jwtConfig.interface";

//Definindo um namespace das configurações do JWT_
export const jwtConfig = registerAs('JWT_CONFIG_AUTH',():JwtConfigInterface => ({
    //Estou centralizando e organizando em um namespace variaveis de ambientes que poderão serem acessíveis em toda aplicação_
    secret: process.env.JWT_SECRET || 'jeffersons',
    access: {
        signOptions: {
            expiresIn: process.env.JWT_EXPIRESIN_ACCESS || '10m'
        }
    },
    reflash: {
        signOptions: {
            expiresIn: process.env.JWT_EXPIRESIN_REFLASH || '1h'
        }
    }
}));