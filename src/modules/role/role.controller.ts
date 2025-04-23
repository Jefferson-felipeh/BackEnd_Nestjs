import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RoleDto } from './dtos/RoleDto';
import { RoleService } from './role.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from '../users/dtos/Userdto';
import { assignsDto } from './dtos/assignsDto';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleEnum } from './enum/RoleEnum';

@Controller('role')
export class RoleController {
    constructor(private service:RoleService){}

    //EndPoint responsável por criar as funções/roles dos usuários_
    @ApiOperation({
        summary: 'Criar Função',
        description: 'Endpoint responsável por criar uma nova função!'
    })
    @ApiOkResponse({description: 'Sucesso ao criar nova função!'})
    @ApiBadRequestResponse({description: 'Erro ao criar nova função!'})
    @Post('create-role')
    async createRole(@Body() dataRole:RoleDto):Promise<RoleDto>{
        return this.service.createRole(dataRole);
    }

    //ATribuir uma nova função a um usuário_
    @ApiOperation({
        summary: 'Adicionar Função',
        description: 'Endpoint responsável por adicionar uma nova função a um usuário!'
    })
    @ApiOkResponse({description: 'Sucesso ao adicionar nova função!'})
    @ApiBadRequestResponse({description: 'Erro ao adicionar nova função!'})
    @Post('assigns-role')
    async assignsRole(@Body() dataRole:assignsDto):Promise<UserDto>{
        return this.service.assignsRole(dataRole);
    }

    //EndPoint responsável por listar as funções/Roles criadas_
    @Get('list-role')
    @ApiOperation({
        summary: 'Listar Funções/Roles',
        description: 'Endpoint responsável por todas as funções!'
    })
    @ApiOkResponse({description: 'Listagem com sucesso!'})
    @ApiBadRequestResponse({description: 'Listagem com sucesso!'})
    async getAllRoles():Promise<RoleDto[]>{
        return this.service.getAllRoles();
    }
    
    //EndPoint responsável por atualizar uma função/Role específica_

    //EndPoint responsável por deletar uma função/Role específica_

    @UseGuards(RolesGuard)
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    @Get('admin')
    admin(){
        return {
            message: "Dados acessado por um admin!"
        }
    }

}
