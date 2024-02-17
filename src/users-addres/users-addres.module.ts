import { Module } from '@nestjs/common';
import { UsersAddresService } from './users-addres.service';
import { UsersAddresController } from './users-addres.controller';

@Module({
  controllers: [UsersAddresController],
  providers: [UsersAddresService],
})
export class UsersAddresModule {}
