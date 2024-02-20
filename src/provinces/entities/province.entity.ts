import { Commune } from "src/communes/entities/commune.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Province {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne((type) => Region, (region) => region.provinces)
    region: Region

    @OneToMany((type) => Commune, (commune) => commune.id)
    communes: Commune[]

}
