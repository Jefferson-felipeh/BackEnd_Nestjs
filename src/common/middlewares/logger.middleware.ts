import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { HEADER_API_KEY } from '../constanTs'; 

//Um middleware é uma classe que é executada antes da execução dos controladores receberem a solicitação;

//Os middleware é a primeira coisa executada quando um cliente envia uma solicitação http em algum endpoint da aplicação;

//Basicamente eu defino uma classe e implemento nessa classe a propriedade NestMiddleware, e essa propriedade
//terá os métodos pre-definidos para serem utilizados.

//Os middlewares tem acesso as requisições e as respostas das solicitações, e usa a função nest() quando a lógica do método da classe é finalizado;
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        //Aqui eu posso construir a lógica necessária com os dados obtidos das requisições/solicitações_
        console.log(`Requisição recebida: ${req.method} ${req.baseUrl}`);

        //Lógica_
        if(req.headers['x-api_key'] !== 'api_key'){
            throw new UnauthorizedException('Api Key is missing');
        }

        next();//Esse nest indica que após esse middleware ser finalizado, ele deve ir para o próximo passo/middleware...
    }
} 