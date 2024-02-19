import { IsInt, IsString } from "class-validator";
import { OneToMany } from "typeorm";
import { Commune } from "../entities/commune.entity";
import { Region } from "src/regions/entities/region.entity";

export class CreateCommuneDto {

    @IsString()
    name: string
    
    @IsInt()
    region: Region

}
