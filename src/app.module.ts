import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';
import { CommunesModule } from './communes/communes.module';
import { ProvincesModule } from './provinces/provinces.module';
import { AddresModule } from './addres/addres.module';
import { ProductsModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';
import { InventoryModule } from './inventory/inventory.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RegionsModule,
    CommunesModule,
    ProvincesModule,
    AddresModule,
    ProductsModule,
    SizesModule,
    InventoryModule,
    ProductCategoryModule,
    ShoppingCartsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}