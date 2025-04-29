import { IsString } from "class-validator";

export class EmailDto{
    @IsString()
    to: string;
    @IsString()
    firstName: string;
}