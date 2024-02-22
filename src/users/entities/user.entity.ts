import { Role } from "src/common/enums/role.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ type: 'enum', default: Role.USER, enum:Role })
    role: string

    @DeleteDateColumn()
    deletedAT: Date

}
