import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersAddresService } from './users-addres.service';
import { CreateUsersAddreDto } from './dto/create-users-addre.dto';
import { UpdateUsersAddreDto } from './dto/update-users-addre.dto';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('users-addres')
export class UsersAddresController {
  constructor(
    private readonly usersAddresService: UsersAddresService
  ) {}

  @Post()
  @Auth(Role.USER)
  create(
    @Body() createUsersAddreDto: CreateUsersAddreDto,
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.usersAddresService.create(createUsersAddreDto, user);
  }

  @Get('addreses')
  @Auth(Role.USER)
  findAllUsersAddresBasesOnEmail(
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.usersAddresService.findAllUsersAddresBasesOnEmail(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersAddresService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
    @Param('id') id: string, 
    @Body() updateUsersAddreDto: UpdateUsersAddreDto,
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.usersAddresService.update(+id, updateUsersAddreDto, user);
  }

  @Delete(':id')
  @Auth(Role.USER)
  remove(
    @Param('id') id: string,
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.usersAddresService.remove(+id, user);
  }
}
