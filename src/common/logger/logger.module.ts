//Criei um módulo específico e personalizado para configurar o logger e utilizar como injeção de dependencia em outras partes da aplicação_
//A ideia é criar o módulo específico e adiciona-lo no AppModule para que possa ser utilizado em outras partes da aplicação_
import { ConsoleLogger, Global, LoggerService, LogLevel, Module } from "@nestjs/common";
import { MyLoggerService } from "./logger.service";
import { LoggerTransportService } from "./logger-transport.service";

@Global()
@Module({
    imports: [],
    providers: [MyLoggerService],
    exports: [
        MyLoggerService,
        LoggerTransportService
    ]
})
export class LoggerModule extends ConsoleLogger{}