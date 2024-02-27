import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    name: string

    @IsString()
    lastName: string

    @IsString()
    rut: string

    @IsEmail()
    email: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string

}
