import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ShoppingCartsService {

  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shippingCartRepository: Repository<ShoppingCart>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto, jwtUser: UserActiveInterface) {
    const user = await this.usersService.findOne(createShoppingCartDto.userId, jwtUser)
    return await this.shippingCartRepository.save({
      user: user
    });
  }

  async addProductsToCart(userId: number, productsId: number[]) {
    const shoppingCart = await this.findByUserId(userId);
    const products = await this.productsService.findProductsById(productsId)
    shoppingCart.products = [ ...shoppingCart.products, ...products ]
    await this.shippingCartRepository.save(shoppingCart);
    return shoppingCart;
  }

  async findAll() {
    const shoppingCarts = await this.shippingCartRepository.find({
      relations: [ 'products', 'user' ]
    });
    if(shoppingCarts.length === 0) throw new NotFoundException('We dont have shopping carts yet')
    return shoppingCarts
  }

  async removeProductFromCart(userId: number, productId: number) {
    const shoppingCart = await this.findByUserId(userId);
    shoppingCart.products = shoppingCart.products.filter(product => product.id !== productId);
    await this.shippingCartRepository.save(shoppingCart);
    return shoppingCart
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }

  async findByUserId(userId: number) {
    const shoppingCart = await this.shippingCartRepository.findOne({
      where: {
        user: { id: userId } 
      },
      relations: ['products', 'user']
    })
    if(!shoppingCart) throw new NotFoundException('This user dont have shopping cart active');
    return shoppingCart
  }

}
