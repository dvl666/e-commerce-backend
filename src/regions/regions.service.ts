import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {

  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    return await this.regionRepository.save(createRegionDto);
  }

  async findAll() {
    return await this.regionRepository.find();
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findOneBy({id: id})
    if(!region) throw new BadRequestException("Region not found")
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    await this.findOne(id)
    return this.regionRepository.update(
    id, {
      ...updateRegionDto
    });
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.regionRepository.delete(id)
  }

  async findOneWithCommunes(regionId: number) {
    console.log(regionId)
    await this.findOne(regionId)
    const region = await this.regionRepository.createQueryBuilder("region")
      .leftJoinAndSelect("region.provinces", "province")
      .where("region.id = :id", { id: regionId })
      .getOne()
    return region
  }
}
