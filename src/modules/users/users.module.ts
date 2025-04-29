import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { RepositoryUser } from './users.repository';
import { Role } from '../role/entities/Role.entity';
import { Address } from '../address/entities/Address.entity';
import { RepositoryAddress } from '../address/address.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role, Address]),

  ],
  controllers: [UsersController],
  providers: [
    RepositoryAddress,
    UsersService,
    RepositoryUser,
  ],
  exports: [
    RepositoryUser,
    UsersService,
  ],
})
export class UsersModule {}
