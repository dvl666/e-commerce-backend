import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async create(createProfileDto: CreateProfileDto, {email, role}: UserActiveInterface) {
    const profileExistenceBool = await this.validateProfileExistence(email)
    if(profileExistenceBool === true) throw new BadRequestException('You already have a profile')
    return await this.profileRepository.save({
      ...createProfileDto,
      user: { email: email }
    })
  }

  findAll() {
    return this.profileRepository.find();
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOneBy({ 'id': id })
    if(!profile) throw new BadRequestException('Profile not found')
    return profile
  }

  async update(id: number, updateProfileDto: UpdateProfileDto, {email, role}: UserActiveInterface) {
    const profile = await this.findOne(id);
    this.validateProfileProperty(profile, email)
    return this.profileRepository.update(id, {
      ...updateProfileDto,
      user: { email: email }
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    const profile = await this.findOne(id);
    await this.validateProfileProperty(profile, user.email);
    return await this.profileRepository.delete(id);
  }

  async validateProfileProperty(profile: Profile, email: string) {
    if(profile.user.email === email) throw new UnauthorizedException('No authorizated')
  }

  async findOneByEmail(email: string) {
    const profile = await this.profileRepository.findOne({
      where: { user: { email } },
      relations: ['user']
    })
    if(!profile) return null;
    return profile
  }

  async validateProfileExistence(email: string) {
    const profile = await this.findOneByEmail(email)
    if(profile) return true
  }

}

