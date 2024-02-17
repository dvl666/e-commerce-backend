import { Injectable } from '@nestjs/common';
import { CreateUsersAddreDto } from './dto/create-users-addre.dto';
import { UpdateUsersAddreDto } from './dto/update-users-addre.dto';

@Injectable()
export class UsersAddresService {
  create(createUsersAddreDto: CreateUsersAddreDto) {
    return 'This action adds a new usersAddre';
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
