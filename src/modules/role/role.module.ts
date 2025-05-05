import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/Role.entity';
import { RepositoryRole } from './role.repository';
import { User } from '../users/entities/User';
import { RepositoryUser } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { Address } from '../address/entities/Address.entity';
import { RepositoryAddress } from '../address/address.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role,User,Address]),
        JwtModule
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RepositoryRole,
        RepositoryUser,
        UsersService,
        RepositoryAddress
    ],
})
export class RoleModule {}
