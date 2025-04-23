import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../enum/RoleEnum";

export const Roles = (...roles:RoleEnum[]) => SetMetadata('roles',roles);