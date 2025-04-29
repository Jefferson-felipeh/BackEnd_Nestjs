import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/User";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository{
    constructor(
        @InjectRepository(User)
        private repository:Repository<User>
    ){}

    //Verificar se o email existe e buscando o email pelo usuário_
    async isEmailExists(email:string):Promise<User>{
            const user = await this.repository.findOne({
                where: {email},
            });

            if(!user) throw new HttpException('Email não encontrado na base de dados!',401);
            return user;
    }
}