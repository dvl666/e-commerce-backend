import { IsInt, IsOptional, IsString, isString } from "class-validator";

export class CreateAddreDto {

    @IsString()
    commune: string

    @IsString()
    addres: string

    @IsInt()
    @IsOptional()
    postalCode?: number

}
