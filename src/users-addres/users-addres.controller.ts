import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersAddresService } from './users-addres.service';
import { CreateUsersAddreDto } from './dto/create-users-addre.dto';
import { UpdateUsersAddreDto } from './dto/update-users-addre.dto';
import { activeUser } from 'src/common/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.USER)
@Controller('users-addres')
export class UsersAddresController {
  constructor(
    private readonly usersAddresService: UsersAddresService
  ) {}

  @Post()
  create(
    @Body() createUsersAddreDto: CreateUsersAddreDto,
    @activeUser() user: UserActiveInterface
    ) {
      console.log(createUsersAddreDto, user)
    return this.usersAddresService.create(createUsersAddreDto, user);
  }

  @Get()
  findAll() {
    return this.usersAddresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersAddresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersAddreDto: UpdateUsersAddreDto) {
    return this.usersAddresService.update(+id, updateUsersAddreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersAddresService.remove(+id);
  }
}
