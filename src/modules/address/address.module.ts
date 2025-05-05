import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/Address.entity';
import { RepositoryAddress } from './address.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    JwtModule
  ],
  providers: [
    AddressService,
    RepositoryAddress
  ],
  controllers: [AddressController],
  exports: [RepositoryAddress]
})
export class AddressModule {}
