import { Addre } from "src/addres/entities/addre.entity";
import { Role } from "src/common/enums/role.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    lastName: string

    @Column({ unique: true })
    rut: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: false, select: false })
    password: string

    @Column({ type: 'enum', default: Role.USER, enum:Role })
    role: string

    @OneToMany((type) => Addre, (addres) => addres.user, { cascade: true })
    addresses: Addre[]

    @DeleteDateColumn()
    deletedAT: Date

}
