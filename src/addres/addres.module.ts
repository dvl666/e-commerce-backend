import { Module } from '@nestjs/common';
import { AddresService } from './addres.service';
import { AddresController } from './addres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addre } from './entities/addre.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Addre]), UsersModule],
  controllers: [AddresController],
  providers: [AddresService],
})

export class AddresModule {}
