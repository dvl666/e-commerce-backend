import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAddreDto } from './dto/create-addre.dto';
import { UpdateAddreDto } from './dto/update-addre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Addre } from './entities/addre.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddresService {

  constructor(
    @InjectRepository(Addre)
    private readonly addreRepository: Repository<Addre>,
    private readonly userService: UsersService
  ) {}

  async create(createAddreDto: CreateAddreDto, user: UserActiveInterface) {
    return await this.addreRepository.save({
      ...createAddreDto,
      communeName: createAddreDto.communeName,
      user: await this.userService.findOne(user.userId, user)
    });
  }

  async findAllUserAddres(user: UserActiveInterface) {
    const addresses = await this.addreRepository.find({
      where: {
        user: {
          id: user.userId
        }
      },
      relations: ['user']
    });
    if(addresses.length === 0) throw new BadRequestException('Not found')
    return addresses;
  }

  async findOne(id: number, user: UserActiveInterface) {
    const addre = await this.addreRepository.findOne({
      where: { id: id },
      relations: [ 'user' ]
    });
    if(!addre) throw new BadRequestException('Not found')
    await this.validateUserProperty(addre.user.id, user)
    return addre
  }

  async update(id: number, updateAddreDto: UpdateAddreDto, user: UserActiveInterface) {
    await this.findOne(id, user)
    return await this.addreRepository.update(id, {
      ...updateAddreDto,
      communeName: updateAddreDto.communeName ,
      postalCode: updateAddreDto.postalCode
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user)
    await this.addreRepository.delete(id)
    return 'Addres deleted'
  }

  async validateUserProperty(addresUserId: number, user: UserActiveInterface) {
    if(addresUserId !== user.userId) throw new UnauthorizedException('Not authorized');
    return
  }

}
