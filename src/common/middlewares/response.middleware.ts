import { NestMiddleware } from "@nestjs/common";

export class ResponseMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log(`Corpo da requisição: ${req.body.email} ${req.body.password}`);
        next();
    }
}