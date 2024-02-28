import { Commune } from "src/communes/entities/commune.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Addre {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => Commune)
    @JoinColumn({ name: 'communeName', referencedColumnName: 'name' })
    commune: Commune

    @Column()
    communeName: string

    @Column({ nullable: false })
    addres: string

    @Column({ nullable: true, default: null })
    postalCode: number

    @ManyToOne((type) => User, (user) => user.addresses, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User

}
