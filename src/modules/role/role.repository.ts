import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/Role.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/User";
import { assignsDto } from "./dtos/assignsDto";

@Injectable()
export class RepositoryRole{
    constructor(
        @InjectRepository(Role)
        private repository:Repository<Role>,
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    //Método responsável por criar uma nova função_
    async createRole(dataRole:Role):Promise<Role>{
        try{
            const role = this.repository.create(dataRole);

            if(!role) throw new HttpException('Erro ao criar role!',400);

            return await this.repository.save(role);
        }catch(error){
            throw new HttpException(`Erro ao cadastrar Role: ${error}`,400);
        }
    }

    //Método responsável por listar todas as funções cadastradas_
    async getAllRoles():Promise<Role[]>{
        return this.repository.find();
    }

    //Método responsável por atribuir uma nova função a um usuário_
    async assignsRole(dataRole:assignsDto):Promise<User>{
        try{
            //Buscando a função_
            const role = await this.repository.findOne({
                where: {
                    id: dataRole.idRole
                }
            });
            if(!role) throw new HttpException('Função/Role não identificada!',400);

            //Buscando o usuário_
            const user = await this.userRepository.findOne({
                where: {
                    email: dataRole.email
                }
            });
            if(!user) throw new HttpException('Usuário não identificada!',400);

            //Verificando se o usuário já possue aquele Role usando a função .some()_
            const existRole = user.roles.some(existingRole => existingRole.id == role.id);
            if(existRole) throw new HttpException('Usuário já possue essa função!',400);

            //Atribuindo o Role ao usuário_
            user.roles.push(role);

            //Salvado os dados do usuário com a nova Role/Função atribuida_
            const saveUser = await this.userRepository.save(user);

            if(!saveUser) throw new HttpException('Erro ao atribuir função ao usuário!',400);

            return saveUser;

        }catch(error){
            throw new HttpException(`Erro encontrado: ${error}`,400);
        }
    }

    //Método responsável por retornar uma função específica com base no seu id_
    async getOneUser(id:string):Promise<User>{
        try{
            const user = await this.userRepository.findOne({
                where: {id},
            });

            if(!user) throw new HttpException('User não encontrada!',400);

            return user;
        }catch(error){
            throw new HttpException(error,400);
        }
    }
}