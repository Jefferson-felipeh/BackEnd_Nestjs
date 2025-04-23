import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'src/common/database/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './modules/address/address.module';
import databaseConfig from 'src/common/config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConfig } from './common/config/jwt.config';
import { RoleModule } from './modules/role/role.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ResponseMiddleware } from './common/middlewares/response.middleware';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig,jwtConfig],
      envFilePath: 'env'
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UsersModule,
    AddressModule,
    AuthModule,
    RoleModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})

//Para utilização dos middlewares na aplicação, eu preciso vir aqui no AppModule e implementar o NestModule_
export class AppModule implements NestModule{
  //O nestModule tem o método configure() onde irei configurar e especificar os middlewares que serão utilizados na aplicação_
  // configure(consumer: MiddlewareConsumer) {
  //     consumer
  //     .apply(
  //       //Esses são so dois middlewares utilizados no momento_
  //       LoggerMiddleware,
  //       ResponseMiddleware
  //     )
  //     //Quando eu não quiser que uma rota específica execute esse middleware,eu simplismente passo o endereço dessa rota usando a função exclude() e especifico a rota_
  //     //.exclude('auth/login')
  //     .exclude('(.*)')
  //     .forRoutes('*')//E aqui é onde eu especifico em quais rotas esses middlewares serão executados;
  // }
}
