import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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
    const size = await this.validateSizeOnDb(createSizeDto.size)
    if(size) throw new NotAcceptableException('This size already exist on database')
    return await this.sizeRepository.save(createSizeDto);
  }

  async findAll() {
    const sizes = await this.sizeRepository.find()
    if(sizes.length === 0) throw new NotFoundException('We dont have sizes yet')
    return sizes;
  }

  async findOne(id: number) {
    const size = await this.sizeRepository.findOne({
      where: { id: id }
    })
    if(!size) throw new NotFoundException('Size not found')
    return size
  }

  async update(id: number, updateSizeDto: UpdateSizeDto) {
    const size = await this.validateSizeOnDb(updateSizeDto.size)
    if(size) throw new NotAcceptableException('This size already exist on database')
    await this.sizeRepository.update(id,{
      ...updateSizeDto
    });
    return 'Size has been updated'
  }

  async remove(id: number) {
    this.findOne(id)
    await this.sizeRepository.delete(id);
    return 'Size has been removed'
  }

  async validateSizeOnDb(size: string) {
    const searchedSize = await this.sizeRepository.findOne({
      where: { size: size }
    })
    return searchedSize
  }

}
