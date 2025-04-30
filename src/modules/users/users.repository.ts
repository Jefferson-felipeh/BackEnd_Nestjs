import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/User";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../role/entities/Role.entity";
import { UserDto } from "./dtos/Userdto";

@Injectable()
export class RepositoryUser{
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository:Repository<Role>,
    ){}

    //Criando novo usuário_
    create = async (dataBody:User,hashPassword:string):Promise<User> => {
        try{
            //Verificando a role_
            const role = await this.roleRepository.findOne({
                where: {
                    name: 'user'
                }
            });

            if(!role) throw new HttpException('Role não existente!',400);

            //Salvando os dados do cep do usuário_
            // const saveCep = await this.addressRepository.create(dataBody.cep);
            // if(!saveCep) throw new HttpException('Cep Inconsistente!',400);

            const createUser = this.repository.create({
                ...dataBody,
                password: hashPassword,
                roles: [role]
            });

            if(!createUser) throw new HttpException('Erro ao criar estrututa de dados do Usuário!',400);

            const saveUser = await this.repository.save(createUser);

            if(!saveUser) throw new HttpException('Erro ao salvar Usuário!',400);

            return saveUser;
        }catch(error){
            throw new HttpException(`Usuário não criado devido a erro: ${error}!`,400);
        }
    }

    //Listando todos os usuários_
    getAll = async ():Promise<User[]> => {
        return this.repository.find();
    }

    async getOne(id:string):Promise<UserDto>{
        try{
            const user = await this.repository.findOne({
                where: {
                    id: id
                },
            });

            if(!user) throw new HttpException('Usuário não encontrado!',400);

            return user;
            
        }catch(error){
            throw new HttpException(error,400);
        }
    }

    //Deletando um usuário_
    delete = async (id:string):Promise<Object> => {
        try{
            const user = await this.repository.findOneBy({id});
    
            if(!user) throw new HttpException('Usuário não encontrado!',400);
    
            await this.repository.delete({id: id});
    
            return {
                status: 200,
                message: 'Dados deletado com sucesso!',
                data: {
                    userName: user.userName,
                    deletedUser: user.deletedAt
                }
            }
        }catch(error){
            throw new HttpException(`Erro ao deletar usuário: ${error}!`,400);
        }
    }

    //Verificando se já existe algum email antes de cadastrar um novo usuário_
    async verifyEmailUser(email:string):Promise<boolean>{
        let isEmail = false;
        try{
            const verify = await this.repository.findOne({where: {email}});
    
            if(verify) {
                isEmail = true;
                throw new HttpException('Email já Cadastrado!',400);
            }
    
            return isEmail;
        }catch(error){
            throw new HttpException(`${error}`,400);
        }
    }

    //Buscando um usuário apartir do seu email_
    async searchUserToEmail(email:string):Promise<boolean>{
        try{
            const verify = await this.repository.findOne({where: {email: email}});
            if(!verify) throw new HttpException('Usuário Inválido!',400);
            return true;
        }catch(error){
            throw new HttpException(error,400);
        }
    }
}