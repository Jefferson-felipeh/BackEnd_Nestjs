import { registerAs } from "@nestjs/config";

//Definindo um nameSpace para as variaveis de ambiente que se referem ao módulo de email_
//Definindo as configurações do transporte do email_
export default registerAs('email',() => ({
    service: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    default: {
        from: process.env.EMAL_FROM
    }
}));