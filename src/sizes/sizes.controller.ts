import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Sizes')
@ApiBearerAuth()
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(
      @Body() createSizeDto: CreateSizeDto,
    ) {
    return this.sizesService.create(createSizeDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll(
  ) {
    return this.sizesService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(
      @Param('id') id: string,
    ) {
    return this.sizesService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
      @Param('id') id: string, 
      @Body() updateSizeDto: UpdateSizeDto,
    ) {
    return this.sizesService.update(+id, updateSizeDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.sizesService.remove(+id);
  }
}
