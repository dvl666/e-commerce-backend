import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    name: string

    @Column()
    lastname: string

    @Column()
    rut: string

}
