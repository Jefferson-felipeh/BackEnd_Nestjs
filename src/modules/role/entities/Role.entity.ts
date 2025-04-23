import { User } from "src/modules/users/entities/User";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class Role{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({name:"NAME_ROLE",unique:true})
    name:string

    @Column('simple-array',{nullable:true})
    permission:string[]

    @ManyToMany(() => User,(user) => user.roles)
    users:User[]
}