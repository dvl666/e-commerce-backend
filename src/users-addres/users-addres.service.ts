import { Injectable } from '@nestjs/common';
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
    private readonly userRepository: Repository<UsersAddre>
  ) {}

  create(createUsersAddreDto: CreateUsersAddreDto, user: UserActiveInterface) {
    return this.userRepository.save({
      ...createUsersAddreDto,
      userEmail: user.email
    })
  }

  findAll() {
    return `This action returns all usersAddres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersAddre`;
  }

  update(id: number, updateUsersAddreDto: UpdateUsersAddreDto) {
    return `This action updates a #${id} usersAddre`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersAddre`;
  }
}
