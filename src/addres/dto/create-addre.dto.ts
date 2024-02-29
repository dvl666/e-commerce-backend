import { IsInt, IsOptional, IsString, isString } from "class-validator";

export class CreateAddreDto {

    @IsString()
    addres: string

    @IsString()
    communeName

    @IsInt()
    @IsOptional()
    postalCode?: number

}
