import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username:string

    @Column({ unique: true })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ default: 'user' })
    role: string

    @DeleteDateColumn()
    deletedAT: Date

}
