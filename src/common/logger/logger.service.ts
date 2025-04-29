import { ConsoleLogger, Injectable, LogLevel } from "@nestjs/common";
import { LoggerTransportService } from "./logger-transport.service";

@Injectable()
export class MyLoggerService extends ConsoleLogger{

    constructor(private loggerTransportService:LoggerTransportService){
        super()
    }

    protected colorize(message: string, logLevel: LogLevel): string {
        return '';
    }

    debug(message: unknown, context?: unknown): void {
        
    }

    log(message: unknown, context?: unknown): void {
        
    }

    error(message: unknown, stack?: unknown, context?: unknown): void {
        
    }

    warn(message: unknown, context?: unknown): void {
        
    }

    verbose(message: unknown, context?: unknown): void {
        
    }
     
}