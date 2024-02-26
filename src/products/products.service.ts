import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto, user: UserActiveInterface) {
    return await this.productRepository.save(createProductDto)
  }

  async findAll() {
    return this.findAllWithInventory()
  }

  async findAllWithInventory() {
    return await this.productRepository.find({
      relations: ['inventory', 'category'] 
    })
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['inventory']
    })
    if(!product) throw new NotFoundException('Product not found')
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: UserActiveInterface) {
    return await this.productRepository.update(id, {
      ...updateProductDto
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    return await this.productRepository.delete(id);
  }
}
