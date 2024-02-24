import { PartialType } from '@nestjs/mapped-types';
import { CreateAddreDto } from './create-addre.dto';

export class UpdateAddreDto extends PartialType(CreateAddreDto) {}
