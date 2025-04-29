import { HttpException, Injectable } from '@nestjs/common';
import { AddressDto } from './dtos/AddressUser';
import databaseConfig from 'src/common/config/database.config';
import { RepositoryAddress } from './address.repository';

@Injectable()
export class AddressService {
    constructor(private repository:RepositoryAddress){}

    // create = async (dataBody:AddressDto):Promise<any> => {
    //     if(!databaseConfig) throw new HttpException('Erro na estrutura de dados!',400);

    //     return this.repository.create(dataBody);
    // }
}
