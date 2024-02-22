import { IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    name: string

    @IsString()
    lastName: string 

    @IsString()
    rut: string

}
