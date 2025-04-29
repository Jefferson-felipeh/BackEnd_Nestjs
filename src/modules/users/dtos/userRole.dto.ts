import { RoleDto } from "src/modules/role/dtos/RoleDto";

export class UserRoleDto{
    id:string
    email:string
    roles: RoleDto[]
}