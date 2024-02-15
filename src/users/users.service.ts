import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    this.findOneByEmail(createUserDto.email)
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(
      id, {
        ...updateUserDto
      }
    )
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email })
    if(user) {
      throw new BadRequestException("Email already register")
    } 
    return user
  }

  async findOneByEmailWithPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email: email })
    if(!user) throw new BadRequestException('Email is not registered')
    return user
  }
}