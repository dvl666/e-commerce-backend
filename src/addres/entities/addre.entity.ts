import { Commune } from "src/communes/entities/commune.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Addre {

    @PrimaryGeneratedColumn()
    id: number

    // @Column({ nullable: false })
    // commune: string

    @ManyToOne((type) => Commune)
    @JoinColumn({ name: 'communeName', referencedColumnName: 'name' })
    commune: Commune

    @Column()
    communeName: string

    @Column({ nullable: false })
    addres: string

    @Column({ nullable: true, default: null })
    postalCode: number

    @ManyToOne((type) => User)
    @JoinColumn({ name:'userEmail', referencedColumnName: 'email' })
    user: User

    // @Column()
    // userEmail: string

}
