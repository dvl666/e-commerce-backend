import { Module } from '@nestjs/common';
import { CommunesService } from './communes.service';
import { CommunesController } from './communes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commune } from './entities/commune.entity';
import { RegionsModule } from 'src/regions/regions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commune]),
    RegionsModule
  ],
  controllers: [CommunesController],
  providers: [CommunesService],
})
export class CommunesModule {}
