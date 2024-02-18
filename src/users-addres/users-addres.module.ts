import { Module } from '@nestjs/common';
import { UsersAddresService } from './users-addres.service';
import { UsersAddresController } from './users-addres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersAddre } from './entities/users-addre.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersAddre]),
    UsersModule
  ],
  controllers: [UsersAddresController],
  providers: [UsersAddresService],
})
export class UsersAddresModule {}
