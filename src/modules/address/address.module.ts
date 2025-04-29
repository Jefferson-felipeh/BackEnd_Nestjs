import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/Address.entity';
import { RepositoryAddress } from './address.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address])
  ],
  providers: [
    AddressService,
    RepositoryAddress
  ],
  controllers: [AddressController],
  exports: [RepositoryAddress]
})
export class AddressModule {}
