import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './dtos/Userdto';
import { RepositoryUser } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/User';

@Injectable()
export class UsersService {
    dataCep: object = {};
    CEP = '55805000';
    urlViaCep:string = `https://viacep.com.br/ws/${this.CEP}/json/`

    constructor(
        private repository:RepositoryUser,
        private jwtService:JwtService
    ){}

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

    //O usuário vai acessar o link do email e vai entrar na página para redefinir a senha_
    //O usuário irá passar a nova senha, e irei capturar o token da URL usando o canActivated_
    //Na verdade, esse endpoint so é executado quando o usuário clica no botão de resetar a senha_
    async resetPassword(newPassword: string, token: string): Promise<User> {
        try {
          //verifica se o token esta válido_
          const payload = await this.jwtService.verify(token, { secret: 'jeffersons' });

          //busca o usuário apartir das informações do token_
          const user = await this.repository.findById(payload.sub);
          if (!user) throw new BadRequestException('Usuário não encontrado');
    
          //Caso as informações do token for válida e busque pelo usuário, irei hashear a nova senha que o usuário forneceu_
          const hashedPassword = await bcrypt.hash(newPassword, 10);

          //irei chamar o método do repositório para atualizar a senha antiga por essa nova senha hasheada_
          const passwrodUserAtualized = await this.repository.updatedPassword(user.id,hashedPassword);

          //verifica se a senha foi atualizada com sucesso no banco de dados pelo repositório_
          if(!passwrodUserAtualized) throw new HttpException('Erro ao passar informações do usuário!',400);

          //Por fim, retorna o objeto do usuário com a nova senha atualizada_
          return passwrodUserAtualized;
          
        } catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw new BadRequestException('Token inválido ou expirado');
            }
            throw new InternalServerErrorException('Ocorreu um erro inesperado');
        }
    }
}
