import { Province } from "src/provinces/entities/province.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commune {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    commune: string

    @ManyToOne(() => Province, (province) => province.province)
    province: Province

}
