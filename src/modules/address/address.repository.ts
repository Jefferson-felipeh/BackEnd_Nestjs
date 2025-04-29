import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "./entities/Address.entity";
import { Repository } from "typeorm";

@Injectable()
export class RepositoryAddress{
    constructor(
        @InjectRepository(Address)
        private repository:Repository<Address>
    ){}

    create = async (cep:string | undefined):Promise<any> => {
        if(!cep) throw new HttpException('Dados não informado!',400);
        const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(req => {
            return req.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });

        const create = this.repository.create({
            ...request,
        });

        console.log(create)
    }
}