import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { User } from "src/modules/users/entities/User"

export class RoleDto{
        @IsString({message: 'Identify is type String!'})
        @IsNotEmpty({message: 'Identify is required!'})
        @ApiProperty({
                type: 'string',
                format: 'uuid',
                description: 'Identificador da função!'
        })
        id:string

        @IsString({message: 'Name is type String!'})
        @IsNotEmpty({message: 'Name is required!'})
        @ApiProperty({
                type: 'string',
                description: 'Nome da função!'
        })
        name:string

        @IsString({message: 'permission is type String!'})
        @IsNotEmpty({message: 'permission is required!'})
        @ApiProperty({
                type: 'array',
                description: 'Permissão definida da função!'
        })
        permission:string[]

        users: User[]
}