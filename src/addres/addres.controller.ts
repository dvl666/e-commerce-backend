import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddresService } from './addres.service';
import { CreateAddreDto } from './dto/create-addre.dto';
import { UpdateAddreDto } from './dto/update-addre.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Addreses')
@ApiBearerAuth()
@Controller('addres')
export class AddresController {
  constructor(private readonly addresService: AddresService) {}

  @Post()
  @Auth(Role.USER)
  create(
      @Body() createAddreDto: CreateAddreDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.addresService.create(createAddreDto, user);
  }

  @Get('my-addresses')
  @Auth(Role.USER)
  findAllUserAddres(
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.addresService.findAllUserAddres(user);
  }
  
  @Get('all-addresses')
  @Auth(Role.ADMIN)
  getAllAddresses() {
    return this.addresService.findAll()
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(
      @Param('id') id: string,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.addresService.findOne(+id, user);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
      @Param('id') id: string, @Body() updateAddreDto: UpdateAddreDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.addresService.update(+id, updateAddreDto, user);
  }

  @Delete(':id')
  @Auth(Role.USER)
  remove(
      @Param('id') id: string,
      @ActiveUser() user: UserActiveInterface  
    ) {
    return this.addresService.remove(+id, user);
  }
}
