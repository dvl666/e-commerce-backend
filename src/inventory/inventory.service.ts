import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { SizesService } from 'src/sizes/sizes.service';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly productService: ProductsService,
    private readonly sizeService: SizesService
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    await this.validateProductExistence(createInventoryDto.productId)
    await this.validateSizeExist(createInventoryDto.sizeValue)
    const inventory = await this.validateExistence(createInventoryDto.productId, createInventoryDto.sizeValue)
    if(inventory) throw new NotAcceptableException('Product with this size already exist');
    return this.inventoryRepository.save(createInventoryDto)
  }

  async findAll() {
    const inventories = await this.inventoryRepository.find()
    if(inventories.length === 0) throw new NotFoundException('We dont have inventories yet')
    return inventories
  }

  async findOne(id: number) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: id }
    });
    if(!inventory) throw new NotFoundException('Inventory not found');
    return inventory;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    await this.validateSizeExist(updateInventoryDto.sizeValue)
    await this.findOne(id);
    await this.inventoryRepository.update(id, {
      ...updateInventoryDto
    })
    return 'Inventory has been updated';
  }

  async remove(id: number) {
    await this.inventoryRepository.delete(id);
    return 'Inventory has been deleted';
  }

  async validateExistence(productId: number, sizeValue: string) {
    const inventory = await this.inventoryRepository
      .createQueryBuilder('inventory')
      .where('inventory.productId = :productId AND inventory.sizeValue = :sizeValue', { productId: productId, sizeValue: sizeValue })
      .getOne()
    return inventory
  }

  async validateProductExistence(productId: number) {
    await this.productService.validateProductExist(productId)
  }

  async validateSizeExist(sizeName: string) {
    const size = await this.sizeService.validateSizeOnDb(sizeName)
    if(!size) throw new NotFoundException('size not exist')
  }

}
