import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index()
    category: string

}
