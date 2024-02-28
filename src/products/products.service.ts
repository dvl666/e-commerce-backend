import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCategoryService } from 'src/product-category/product-category.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: ProductCategoryService
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.categoryExist(createProductDto.category)
    return await this.productRepository.save(createProductDto)
  }

  async findAll() {
    return this.findAllWithInventory()
  }

  async findAllWithInventory() {
    const products = await this.productRepository.find({
      relations: [ 'inventory', 'category' ]
    })
    if(products.length === 0) throw new NotFoundException('We dont have products yet')
    return products
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['inventory', 'category']
    })
    if(!product) throw new NotFoundException('Product not found')
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.categoryExist(updateProductDto.category)
    return await this.productRepository.update(id, {
      ...updateProductDto
    });
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }

  async categoryExist(category: string) {
    await this.categoryService.findOneByName(category)
  }

  async validateProductExist(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id }
    })
    if(!product) throw new NotFoundException('Product whit that id not exist')
  }

}
