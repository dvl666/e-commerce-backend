import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { AddProductsDto } from './dto/add-products.dto';
import { removeProductDto } from './dto/remove-product.dto';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(
    private readonly shoppingCartsService: ShoppingCartsService,
  ) {}

  @Post()
  @Auth(Role.USER)
  create(
    @Body() createShoppingCartDto: CreateShoppingCartDto,
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.shoppingCartsService.create(createShoppingCartDto, user);
  }

  @Post('add-products')
  @Auth(Role.USER)
  addProductsToCart(
    @Body() addProductsDto: AddProductsDto,
    @ActiveUser() {userId, role}: UserActiveInterface
  ) {
    return this.shoppingCartsService.addProductsToCart(userId, addProductsDto.productsToAdd)
  }

  @Post('remove-product')
  @Auth(Role.USER)
  removeProductFromCart(
    @Body() removeProductDto: removeProductDto,
    @ActiveUser() {userId, role}: UserActiveInterface
  ) {
    return this.shoppingCartsService.removeProductFromCart(userId, removeProductDto.productId)
  }

  
  @Get()
  @Auth(Role.USER)
  findOne(
    @ActiveUser() {userId, role}: UserActiveInterface
  ) {
    return this.shoppingCartsService.findByUserId(+userId);
  }

  @Get('findall')
  @Auth(Role.ADMIN)
  findAll() {
    return this.shoppingCartsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartsService.update(+id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartsService.remove(+id);
  }
}
