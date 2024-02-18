import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersAddre {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    region: string

    @Column()
    comune: string

    @Column()
    addres: string

    @Column()
    phoneNumber: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
    user: User;

    @Column()
    userEmail: string;

    @DeleteDateColumn()
    deletedAt: Date

}
