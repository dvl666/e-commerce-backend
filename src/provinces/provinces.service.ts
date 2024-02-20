import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService {

  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>
  ) {}

  create(createProvinceDto: CreateProvinceDto) {
    return 'This action adds a new province';
  }

  findAll() {
    return `This action returns all provinces`;
  }

  async findOne(id: number) {
    const province = await this.provinceRepository.findOneBy({ id: id });
    if(!province) throw new BadRequestException('Province not found');
    return province
  }

  update(id: number, updateProvinceDto: UpdateProvinceDto) {
    return `This action updates a #${id} province`;
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }

  async findOneWithCommunes(id: number) {
    await this.findOne(id)
    const province = await this.provinceRepository.createQueryBuilder("province")
      .leftJoinAndSelect("province.communes", "commune")
      .where("province.id = :id", { id: id })
      .getOne()
    return province
  }
}
