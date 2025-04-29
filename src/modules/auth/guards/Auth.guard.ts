import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
//Referenciando qual a estratégia do passport utilizada, que é a local_
export class AuthGuardsService extends AuthGuard('local'){}