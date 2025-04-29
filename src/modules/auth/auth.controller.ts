import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLocalStrategy } from './strategys/auth-local.strategy';
import { AuthGuardsService } from './guards/Auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(){}

    @UseGuards(AuthGuardsService)
    @ApiOperation({
        summary: 'Login do usuário',
        description: 'Rota responsável pela autenticação do usuário!'
    })
    @ApiOkResponse({description: 'Login bem sucedido!'})
    @ApiBadRequestResponse({description: 'Erro ao fazer login!'})
    @Post('login')
    async signIn(@Request() req:any):Promise<object>{
        return req.user;
    }

    @Post('logout')
    logout(@Request() req){
        req.logout();
    }
} 
