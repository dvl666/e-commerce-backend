import { Product } from "src/products/entities/product.entity";
import { Size } from "src/sizes/entities/size.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => Product)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product

    @Column()
    productId: number

    @ManyToOne((type) => Size)
    @JoinColumn({ name: 'sizeValue', referencedColumnName: 'size' })
    size: Size

    @Column()
    sizeValue: string

    @Column()
    stock: number

}
