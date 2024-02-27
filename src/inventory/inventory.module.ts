import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { ProductsModule } from 'src/products/products.module';
import { SizesModule } from 'src/sizes/sizes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), ProductsModule, SizesModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
