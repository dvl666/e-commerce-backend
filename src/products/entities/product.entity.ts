import { Inventory } from "src/inventory/entities/inventory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    // @OneToMany((type) => Inventory, (inventory) => inventory.)
    // @JoinColumn

}
