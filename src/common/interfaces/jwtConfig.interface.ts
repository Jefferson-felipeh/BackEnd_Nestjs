import { JwtModuleOptions } from "@nestjs/jwt"

//Defini uma inteface para tipar o namespace e deixa-lo padronizado conforme as suas propriedades_
export interface JwtConfigInterface{
    secret:string
    access: JwtModuleOptions
    reflash:JwtModuleOptions
}