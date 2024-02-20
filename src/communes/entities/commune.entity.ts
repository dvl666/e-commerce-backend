import { Province } from "src/provinces/entities/province.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commune {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToOne((type) => Province, (province) => province.communes)
    province: Province

}
