import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBasicAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/Userdto';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { RoleEnum } from '../role/enum/RoleEnum';
import { Roles } from '../role/decorators/role.decorator';

@ApiTags('users')
@ApiBasicAuth()
@Controller('users')
export class UsersController {

    constructor(private service:UsersService){}

    //Endpoint responsável por criar um novo usuário_
    @ApiOperation({
        summary: 'Criação de usuário',
        description: 'Rota responsável por criar um novo usuário no banco de dados',
    })
    @ApiOkResponse({description: 'Usuário criado com sucesso'})
    @ApiBadRequestResponse({description:'Erro ao criar usuário'})
    @Post('create')
    async create (@Body() dataBody:UserDto):Promise<UserDto>{
        return this.service.create(dataBody);
    }

    //Endpoint responsável por listar todos os usuários_
    @UseGuards(JwtGuard)
    @ApiOperation({
        summary: 'Listar todos os usuários',
        description: 'Rota responsável por Listar todos os usuários',
    })
    @ApiOkResponse({description: 'Usuários listados com sucesso'})
    @ApiBadRequestResponse({description:'Erro ao listar usuários'})
    @Get('list')
    async getAll ():Promise<UserDto[]>{
        return this.service.getAll();
    }

    //Endpoint responsável por deletar um usuário_
    @ApiOperation({
        summary: 'Deleção de usuário',
        description: 'Rota responsável por deletar um usuário no banco de dados',
    })
    @ApiOkResponse({description: 'Usuário deletado com sucesso'})
    @ApiBadRequestResponse({description:'Erro ao deletar usuário'})
    @Delete('delete/:id')
    async delete(@Param('id', ParseUUIDPipe) id:string){
        return this.service.delete(id);
    }

    @Post('reset-password')
    async resetPasswordUser(@Body() body: {password:string,token:string}):Promise<any>{
        return this.service.resetPassword(body.password,body.token);
    }
}
