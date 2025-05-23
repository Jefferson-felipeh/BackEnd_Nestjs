import { AuthResponseInterface } from "../interfaces/auth-response.interface";

export class AuthResponseDto implements AuthResponseInterface{
    accessToken: string;
    reflashToken: string;
}