import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Auth(Role.USER)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(
    @Body() createProfileDto: CreateProfileDto,
    @ActiveUser() user: UserActiveInterface
    ) {
      console.log('hola',user)
    return this.profilesService.create(createProfileDto, user);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  update(
      @Param('id') id: string, 
      @Body() updateProfileDto: UpdateProfileDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.profilesService.update(+id, updateProfileDto, user);
  }

  @Delete(':id')
  remove(
      @Param('id') id: string,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.profilesService.remove(+id, user);
  }
}
