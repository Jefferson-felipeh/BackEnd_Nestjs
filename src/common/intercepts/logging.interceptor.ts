import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { catchError, map, Observable, tap, throwError } from "rxjs";

@Injectable()
export class LoggingInterceptor<T> 
implements NestInterceptor<T , Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> | any {
        console.log('...BEFORE');
        //Tudo antes do retorno dessa classe é executando antes da execução dos manipuladores de rotas_
        console.log(context);

        const dateNow = Date.now();
        //E o retorno indica que é tudo depois da execução dos manipuladores de rotas_
        return next
        .handle()
        .pipe(
            //Eu posso passar uma série de métodos, cada um com funcionalidades específicas, que serão executados após a execução dos manipuladores de rotas_
            tap(() => console.log(`...After! Tempo de execução: ${Date.now() - dateNow}ms`)),

            map((data) => ({//Esse método vai modificar a forma como os dados serão retornados para o cliente_
               success: true,
               statusCode: context.switchToHttp().getResponse().statusCode,
               timeStamp: new Date().toISOString(),
               data: data,
               path: ''
            })), 

            catchError((error) => {
                console.error('Erro capturado no interceptor: ',error.message);
                return throwError(() => new HttpException(error,400));
            }),
        );
    }
}