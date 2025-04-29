import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/Userdto';
import { RepositoryUser } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    dataCep: object = {};
    CEP = '55805000';
    urlViaCep:string = `https://viacep.com.br/ws/${this.CEP}/json/`

    constructor(private repository:RepositoryUser){}

    dataApi () {
        fetch(this.urlViaCep)
        .then(request => {
            if(!request) throw new HttpException('Erro na requisição com o VIACEP!',400);
            return request.json();
        })
        .then(data => {
            this.dataCep = data
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    create = async (dataBody:UserDto):Promise<UserDto> => {
        try{

            if(!dataBody) throw new HttpException('Erro na estrutura de dados!',400);
    
            //VERIFICAR EMAIL_
            const isEmailExists = await this.repository.verifyEmailUser(dataBody.email);
            if(isEmailExists) throw new HttpException('Email já existe!',400);

            //Hasheando a senha_
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(dataBody.password,salt);
    
            return await this.repository.create(dataBody,hashPassword);
        }catch(error){
            console.log(error)
            throw new HttpException(error,400);
        }
    }

    getAll = async ():Promise<UserDto[]> => {
        this.dataApi();
        return this.repository.getAll();
    }

    delete = async (id:string):Promise<object> => {
        if(!id) throw new HttpException('Identificador inválido!',400);

        return this.repository.delete(id);
    }
}
