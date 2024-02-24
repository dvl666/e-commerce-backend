import { Province } from "src/provinces/entities/province.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commune {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    @Index()
    name: string

    @ManyToOne((type) => Province, (province) => province.communes)
    province: Province

}
