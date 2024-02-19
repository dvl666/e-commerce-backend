import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommuneDto } from './dto/create-commune.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commune } from './entities/commune.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunesService {

  constructor(

    @InjectRepository(Commune)
    private readonly communeRepository : Repository<Commune>

  ) {}

  create(createCommuneDto: CreateCommuneDto) {
    return this.communeRepository.save(createCommuneDto)
  }

  findAll() {
    return this.communeRepository.find({
      relations: ["province"]
    });
  }

  findOne(id: number) {
    const commune = this.communeRepository.findOneBy({id: id});
    if(!commune) throw new BadRequestException("Commune not found")
    return commune
  }

  async update(id: number, updateCommuneDto: UpdateCommuneDto) {
    await this.findOne(id);
    return this.communeRepository.update(
      id, {
        ...updateCommuneDto
      })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.communeRepository.delete(id);
  }
}
