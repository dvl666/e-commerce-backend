import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsersAddreDto } from './dto/create-users-addre.dto';
import { UpdateUsersAddreDto } from './dto/update-users-addre.dto';
import { Repository } from 'typeorm';
import { UsersAddre } from './entities/users-addre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

@Injectable()
export class UsersAddresService {

  constructor(
    @InjectRepository(UsersAddre) //Acordarse de injectar el repositorio (mas o menos 1 hora)
    private readonly userAddresRepository: Repository<UsersAddre>
  ) {}

  create(createUsersAddreDto: CreateUsersAddreDto, user: UserActiveInterface) {
    return this.userAddresRepository.save({
      ...createUsersAddreDto,
      userEmail: user.email
    })
  }

  findAllUsersAddresBasesOnEmail(user: UserActiveInterface) {
    return this.userAddresRepository.find({
      where: { userEmail: user.email }
    });
  }

  findOne(id: number) {
    const user = this.userAddresRepository.findOneBy({
      id: id
    });
    if(!user) throw new BadRequestException('Addres not found')
    return user
  }

  async update(id: number, updateUsersAddreDto: UpdateUsersAddreDto, user: UserActiveInterface) {
    const userToUpdate = await this.findOne(id)
    await this.verifyUserEmail(user.email, userToUpdate.userEmail)
    return await this.userAddresRepository.update(
      id, {
        ...updateUsersAddreDto,
        userEmail: user.email
      }
    )
  }

  async remove(id: number, user: UserActiveInterface) {
    const userToDelete = await this.findOne(id);
    console.log(userToDelete)
    console.log(user.email, 'holas')
    this.verifyUserEmail(userToDelete.userEmail, user.email);
    return await this.userAddresRepository.softDelete(id);
  }

  verifyUserEmail(email: string, userEmail: string) { 
    if(email !== userEmail) throw new UnauthorizedException()
  }

}
