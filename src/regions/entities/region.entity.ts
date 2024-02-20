import { Commune } from "src/communes/entities/commune.entity";
import { Province } from "src/provinces/entities/province.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    abbreviation: string

    @OneToMany((type) => Province, (province) => province.region)
    provinces: Province[]

}
