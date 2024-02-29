import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoppingCart {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany((type) => Product)
    @JoinTable()
    products: Product[]

    @OneToOne((type) => User)
    @JoinColumn()
    user: User

}
