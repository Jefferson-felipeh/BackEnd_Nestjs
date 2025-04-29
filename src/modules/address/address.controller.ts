import { Body, Controller, Post } from '@nestjs/common';
import { AddressDto } from './dtos/AddressUser';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private service:AddressService){}
    
    // @Post()
    // async create(@Body() dataBody:AddressDto):Promise<AddressDto>{
    //     return this.service.create(dataBody);
    // }
}
