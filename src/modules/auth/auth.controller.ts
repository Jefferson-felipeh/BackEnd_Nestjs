import { Body, Controller, Param, ParseUUIDPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuardsService } from './guards/Auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private authService:AuthService){}

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

    @Post('jwt/:token')
    async validToken(@Param('token') token:ParseUUIDPipe){
        return this.authService.validToken(token);
    }

    @Post('logout')
    logout(@Request() req){
        req.logout();
    }
} 
