import { Module } from '@nestjs/common';
import { AddresService } from './addres.service';
import { AddresController } from './addres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addre } from './entities/addre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Addre])],
  controllers: [AddresController],
  providers: [AddresService],
})

export class AddresModule {}
