import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commune {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToOne(() => Region, (region) => region.name)
    region: Region

}
