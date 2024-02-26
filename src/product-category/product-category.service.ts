import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoryService {

  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    await this.validateCategoryName(createProductCategoryDto.category)
    return await this.productCategoryRepository.save(createProductCategoryDto);
  }

  async findAll() {
    const categories = await this.productCategoryRepository.find()
    if(!categories) throw new NotFoundException('We currently have no registered categories.')
    return this.productCategoryRepository.find()
  }

  async findOne(id: number) {
    const productCategory = await this.productCategoryRepository.findOne({
      where: { id: id }
    });
    if(!productCategory) throw new NotFoundException('Category not found');
    return productCategory
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    await this.findOne(id);
    await this.validateCategoryName(updateProductCategoryDto.category)
    return await this.productCategoryRepository.update(id, {
      ...updateProductCategoryDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productCategoryRepository.delete(id);
    return 'Category has been deleted'
  }

  async validateCategoryName(categoryName: string) {
    const category = await this.productCategoryRepository.findOne({
      where: { category: categoryName }
    });
    if(category) throw new NotAcceptableException('Category with this name already exist')
  }
}
