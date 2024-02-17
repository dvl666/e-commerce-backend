import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUsersAddreDto {

    @IsString()
    region: string

    @IsString()
    comune: string
    
    @IsString()
    addres: string

    @IsNumber()
    phoneNumber: string

    @IsString()
    @IsOptional()
    userEmail?: string

}
