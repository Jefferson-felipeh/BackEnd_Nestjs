import { HttpException, Injectable } from '@nestjs/common';
import { RoleDto } from './dtos/RoleDto';
import { RepositoryRole } from './role.repository';
import { UserDto } from '../users/dtos/Userdto';
import { assignsDto } from './dtos/assignsDto';

@Injectable()
export class RoleService {
    constructor(private repositoryRole:RepositoryRole){}

    //Método responsável por criar uma nova função no banco_
    async createRole(dataRole:RoleDto):Promise<RoleDto>{
        if(!dataRole) throw new HttpException('Erro ao obter dados do Role!',400);

        return this.repositoryRole.createRole(dataRole);
    }

    //Método responsável por listar todas as funções_
    async getAllRoles():Promise<RoleDto[]>{
        try{
            return this.repositoryRole.getAllRoles();
        }catch(error){
            throw new HttpException('Erro ao listar dados!',400);
        }
    }

    //Método responsável por atribuir uma nova função a um usuário_
    async assignsRole(dataRole:assignsDto):Promise<UserDto>{
        if(!dataRole.email || !dataRole.idRole) throw new HttpException('Identificador do usuário ou da função Inválidos!',400);

        return await this.repositoryRole.assignsRole(dataRole);
    }
}
