import { Commune } from "src/communes/entities/commune.entity";
import { Profile } from "src/profiles/entities/profile.entity";
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

    @ManyToOne((type) => Profile)
    @JoinColumn({ name:'userEmail', referencedColumnName: 'userEmail' })
    profile: Profile

    @Column()
    userEmail: string

}
