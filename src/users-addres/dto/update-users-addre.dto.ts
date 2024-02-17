import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersAddreDto } from './create-users-addre.dto';

export class UpdateUsersAddreDto extends PartialType(CreateUsersAddreDto) {}
