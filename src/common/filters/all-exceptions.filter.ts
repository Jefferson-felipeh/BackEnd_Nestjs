import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
//Eu posso utilizar o Exceptions Filter principalmente para personalizar a forma como as exceções serão exibidas nas respostas das solicitações_
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        //Na resposta das solicitações, é aqui onde determino o que será exibido para o cliente_
        response
        .status(status)
        .json(this.messageStatusCode(status,exception,request))//Ele vai retornar um json como resposta, onde eu posso, de forma personalizada, configurar e exibir os erros nas respostas;

        //Eu posso personalizar as mensagens de exceções de acordo com o statusCode retornado;
    }

    private messageStatusCode = (
        statusCode: number, 
        exception:HttpException,
        request:Request) => {
        if(statusCode == 400) return {
            httpException: {
                statusCode: statusCode.toString(),
                message:{
                    error: request.statusCode,
                    description:(exception instanceof HttpException) ? exception.getStatus() : HttpStatus.BAD_REQUEST,
                    body: {
                        data: request.body
                    }
                } ,
                timeStamp: new Date().toISOString(),
                path: request.url,
            },
        }

        if(statusCode == 401) return {
            httpException: {
                statusCode: statusCode.toString(),
                message:{
                    error: request.statusCode,
                    description:'Usuário não possue Permissão!'
                } ,
                timeStamp: new Date().toISOString(),
                path: request.url,
            },
        }
    }

    //Além disso, eu também posso adicionar de forma local nos endpoints específicos do controller usando o decorador:
    //@UserFilter(e passando o nome dessa classe, mas ela precisa ser Injetável())
}