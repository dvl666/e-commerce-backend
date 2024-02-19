import { Commune } from "src/communes/entities/commune.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Region as enumRegion } from "../common/enums/regions.enum";

@Entity()
export class Region {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    abbreviation: string

    // @OneToMany(() => Commune, (commune) => commune.name)
    // commune: Commune[]

}
