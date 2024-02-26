import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(
      @Body() createProductDto: CreateProductDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.productsService.create(createProductDto, user);
  }

  // @Auth(Role.USER)
  @Get()
  findAll() {
    return this.productsService.findAllWithInventory();
  }

  // @Auth(Role.USER)
  @Get(':id')
  findOne(
      @Param('id') id: string,
      // @ActiveUser() user: UserActiveInterface  
    ) {
    return this.productsService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
      @Param('id') id: string, 
      @Body() updateProductDto: UpdateProductDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.productsService.update(+id, updateProductDto, user);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(
      @Param('id') id: string,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.productsService.remove(+id, user);
  }
}
