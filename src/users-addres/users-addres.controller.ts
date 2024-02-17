import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersAddresService } from './users-addres.service';
import { CreateUsersAddreDto } from './dto/create-users-addre.dto';
import { UpdateUsersAddreDto } from './dto/update-users-addre.dto';

@Controller('users-addres')
export class UsersAddresController {
  constructor(private readonly usersAddresService: UsersAddresService) {}

  @Post()
  create(@Body() createUsersAddreDto: CreateUsersAddreDto) {
    return this.usersAddresService.create(createUsersAddreDto);
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
