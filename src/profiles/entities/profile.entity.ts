import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    rut: string

    @OneToOne((type) => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
    user: User

}
