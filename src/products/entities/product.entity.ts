import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column()
    description: string

    @Column({ nullable: false })
    price: number

    @Column({ default: 'not implement' })
    category: string

}
