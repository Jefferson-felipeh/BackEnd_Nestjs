import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Address } from 'src/modules/address/entities/Address.entity';
import { Role } from 'src/modules/role/entities/Role.entity';

@Exclude()
export class UserDto{
    @IsString()
    @ApiProperty({
        type: 'string',
        format: 'uuid',
        title: '',
        description:''
    })
    @Expose()
    id: string

    @IsString()
    @ApiProperty({
        type: 'string',
        format: '',
        title: '',
        description:''
    })
    @Length(10,2000)
    @ApiProperty()
    @Expose()
    userName:string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        format: '',
        title: '',
        description:''
    })
    @Expose()
    email:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        format: '',
        title: '',
        description:''
    })
    password:string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        format: '',
        title: 'Cep',
        description:'Cep do endereço do usuário'
    })
    @Expose()
    cep?:string

    roles:Role[]

    address: Address[]

    @IsDateString()
    @ApiProperty({
        type: 'string',
        format: '',
        title: '',
        description:''
    })
    @Expose()
    createdAt:Date

    @IsDateString()
    @ApiProperty({
        type: 'string',
        format: '',
        title: '',
        description:''
    })
    @Expose()
    updatedAt:Date

    @IsDateString()
    @ApiProperty({
        type: 'string',
        format: '',
        title: '',
        description:''
    })
    @Expose()
    deletedAt:Date
}