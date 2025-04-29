import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddressDto{
    @IsString()
    @IsNotEmpty({message:''})
    @ApiProperty({
        type: 'string',
        format: 'uuid',
        title: '',
        description:''
    })
    id?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    _id_User?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    cep?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    logradouro?: string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    complemento?: string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    unidade?: string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    bairro?: string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    localidade?: string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    uf?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    estado?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    regiao?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    ibge?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    gia?:string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    ddd?: string

    @IsString()
    @IsNotEmpty({message:''})
      @ApiProperty({
        type: 'string',
        title: '',
        description:''
    })
    siafi?:string
}