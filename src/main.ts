import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/intercepts/logging.interceptor';


//Eu posso criar um log personalizado e instancia-lo onde irei utiliza-lo_
// class loggerCustomer extends ConsoleLogger{
//   log(message: unknown, context?: unknown): void {
//       super.log(context,message);
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    //O logger vai permitir personalizar a forma como os logs são exibidos no rodar da aplicação_
    //Eu posso usar diretamente no main.ts dessa forma, a diferentça é que não será possível personalizar e injeta-los nas demais partes da aplicação_
    // logger: new ConsoleLogger({
    //json: true,
    //context: 'contexto',
    //   colors: true,
    //   prefix: 'MyAppNestJs',
    //   compact: 1
    // })

    //Instanciando os mesu logger personalizados_
    //logger: new loggerCustomer(),
    //logger: new MyLogger()
  });

  app.enableCors({
    origin: 'http://localhost:4200', // libera apenas o Angular local
    credentials: true, // se precisar enviar cookies ou headers de autenticação
  });

  //Usando o Exceptions Filters de forma global_
  //app.useGlobalFilters(new HttpExceptionFilter());//Preciso instanciar a classe;
  // app.useGlobalInterceptors(new LoggingInterceptor());

  //Configuração do swagger_
  //1º Parte_
  const config = new DocumentBuilder()
  .setTitle('swagger Jefferson')
  .setDescription('Documentação da API')
  .setVersion('v1')
  .addTag('users')
  .addBearerAuth()
  .build();

  //2º Parte_
  const document = SwaggerModule.createDocument(app,config);

  //3º Parte_
  SwaggerModule.setup('api',app,document);

  await app.listen(process.env.PORT ?? 8065);
}
bootstrap();
