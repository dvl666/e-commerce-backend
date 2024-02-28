import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    this.userEmailExist(createUserDto.email)
    this.userRutExist(createUserDto.rut)
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number, jwtUser: UserActiveInterface) {
    const user: User = await this.userRepository.findOne({
      where: { id: id }
    })
    if(!user) throw new NotFoundException('Not found any user')
    if(user.id !== jwtUser.userId) throw new UnauthorizedException('Not authorized')
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto, user: UserActiveInterface) {
    if(id !== user.userId) throw new UnauthorizedException('You are not the owner of this profile' )
    await this.userRepository.update(
      id, {
        ...updateUserDto
      }
    )
    const userUpdated = this.findOne(id, user);
    return userUpdated
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }

  async findOneWithEmail(email: string){
    const user = await this.userRepository.findOneBy({ email: email })
    if(!user) throw new BadRequestException('Email not found')
    return user
  }

  async userEmailExist(email: string) {
    const user = await this.userRepository.findOneBy({ email: email })
    if(user) {
      throw new BadRequestException("Email already register")
    } 
    return user
  }

  async findOneByEmailWithPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: [ 'id', 'name', 'lastName', 'rut', 'email', 'password', 'rut', 'role' ]
    })
    if(!user) throw new BadRequestException('Email is not registered')
    return user
  }

  async userRutExist(rut: string) {
    const user = await this.userRepository.findOneBy({
        rut: rut 
    })
    if(user) throw new NotAcceptableException('Rut already been used')
    return user
  }

}
