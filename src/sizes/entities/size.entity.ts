import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Size {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    @Index()
    size: string

}
