import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAddreDto } from './dto/create-addre.dto';
import { UpdateAddreDto } from './dto/update-addre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Addre } from './entities/addre.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { mapAddressResults } from 'src/common/mappers/addres.mapper';

@Injectable()
export class AddresService {

  constructor(
    @InjectRepository(Addre)
    private readonly addreRepository: Repository<Addre>
  ) {}

  async create(createAddreDto: CreateAddreDto, user: UserActiveInterface) {
    return await this.addreRepository.save({
      ...createAddreDto,
      commune: { name: createAddreDto.commune },
      profile: { user: { email: user.email} }
    });
  }

  // async findAllUserAddres(user: UserActiveInterface) {
  //   const addresses = await this.addreRepository.find({
  //     where: {
  //       profile: {
  //         user: {
  //           email: user.email
  //         }
  //       }
  //     },
  //     relations: [ 'commune', 'profile.user' ]
  //   });
  //   if(!addresses) throw new NotFoundError('Not found')
  //   return addresses;
  // }

  async findAllUserAddres(user: UserActiveInterface) {
    const addresses = await this.addreRepository.find({
      where: {
        profile: {
          user: {
            email: user.email
          }
        }
      },
      relations: [ 'commune', 'profile.user' ]
    });
    if(!addresses) throw new BadRequestException('Not found')
    const addressesMapped = mapAddressResults(addresses);
    return addressesMapped
  }

  async findOne(id: number, user: UserActiveInterface) {
    const addre = await this.addreRepository.findOne({
      where: { id: id },
      relations: [ 'profile.user', 'commune' ]
    });
    if(!addre) throw new BadRequestException('Not found')
    await this.validateUserProperty(addre.profile.user.email, user)
    return addre
  }

  async update(id: number, updateAddreDto: UpdateAddreDto, user: UserActiveInterface) {
    await this.findOne(id, user)
    return await this.addreRepository.update(id, {
      ...updateAddreDto,
      commune: { name: updateAddreDto.commune },
      // profile: {  }
      postalCode: updateAddreDto.postalCode
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user)
    await this.addreRepository.delete(id)
    return 'Addres deleted'
  }

  async validateUserProperty(addresEmail: string, user: UserActiveInterface) {
    if(addresEmail !== user.email) throw new UnauthorizedException('Not authorized');
    return
  }

}
