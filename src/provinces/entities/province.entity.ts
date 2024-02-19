import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Province {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    province: string

    // @Column()
    // regionId: number

    @ManyToOne(() => Region, (region) => region.name)
    region: Region

}
