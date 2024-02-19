import { IsInt, IsString } from "class-validator";
import { OneToMany } from "typeorm";
import { Commune } from "../entities/commune.entity";
import { Region } from "src/regions/entities/region.entity";
import { Province } from "src/provinces/entities/province.entity";

export class CreateCommuneDto {

    @IsString()
    name: string
    
    @IsInt()
    province: Province

}
