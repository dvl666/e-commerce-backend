import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {

  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    await this.validateSizeOnDb(createSizeDto.size)
    return await this.sizeRepository.save(createSizeDto);
  }

  async findAll() {
    return await this.sizeRepository.find();
  }

  async findOne(id: number) {
    const size = await this.sizeRepository.findOne({
      where: { id: id }
    })
    if(!size) throw new NotFoundException('Size not found')
    return size
  }

  async update(id: number, updateSizeDto: UpdateSizeDto) {
    return await this.sizeRepository.update(id,{
      ...updateSizeDto
    });
  }

  async remove(id: number) {
    return await this.sizeRepository.delete(id);
  }

  async validateSizeOnDb(size: string) {
    const searchedSize = await this.sizeRepository.findOne({
      where: { size: size }
    })
    if(searchedSize) throw new ConflictException('Size already exist')
  }

}
