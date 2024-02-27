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
    if(categories.length === 0) throw new NotFoundException('We dont have categories yet')
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
    await this.productCategoryRepository.update(id, {
      ...updateProductCategoryDto
    });
    return 'Category has been updated'
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

  async findOneByName(name: string) {
    const category = await this.productCategoryRepository.findOne({
      where: { category: name }
    })
    if(!category) throw new NotFoundException('We dont have a category with that name')
    return
  }

}
