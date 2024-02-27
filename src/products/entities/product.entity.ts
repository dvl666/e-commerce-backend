import { Inventory } from "src/inventory/entities/inventory.entity";
import { ProductCategory } from "src/product-category/entities/product-category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    
    @OneToMany((type) => Inventory, (inventory) => inventory.product)
    inventory: Inventory[]

    @ManyToOne((type) => ProductCategory, (category) => category.category)
    @JoinColumn({ name: 'categoryName', referencedColumnName: 'category' })
    category: string

}
