import { Exclude } from "class-transformer";
import { CommonEntity } from "src/common/common.entity";
import { Address } from "src/modules/address/entities/Address.entity";
import { Role } from "src/modules/role/entities/Role.entity";
import { Entity, Column, Unique, Index, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity('USER')
//Apesar de eu achar que é redundante, pois já estu definindo a unicidade na própria coluna, mas da pra definir assim também;
@Unique(['email'])
export class User extends CommonEntity{
    /*
        -> Observa que estou extendendo a classe/entidade CommonEntity, pois nela já tem
        os campos id,createdAt,updatedAt e deletedAt, pois será colunas padrão para todas as entidades,
        bastando apenas extender essa classe/entidade para as demais entidades da aplicação;

        -> Lembrando que a propriedade extends extende uma classe ou função para uma outra, em que essa
        outra classe ou função terá acesso as propriedades e métodos dessa classe ou função extendida;

        -> Por fim estou implementando a interface, para que por padrão, eu determino que a entidade tenha, 
        por obrigatoriedade, os campos presentes nessa interface;
    */

    @Column({name:'USERNAME',type:'text',nullable: false})
    @Index('IDX_USERNAME')
    userName:string
    
    @Column({name:'EMAIL',type:'text',nullable: false, unique: true})
    email:string

    @Column({name:'PASSWORD',type:'text',nullable: false})
    password:string

    @Column({name:'CEP',type:'text',nullable: true,default:''})
    @Index('IDX_CEP')
    cep?:string

    @ManyToMany(() => Role, (role) => role.users,{eager: true, cascade: true})
    @JoinTable({
        name: 'user-roles',
        joinColumn: {name: 'user_id',referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'role_id',referencedColumnName: 'id'}
    })
    roles:Role[]

    @ManyToOne(() => Address,(address) => address.users)
    @JoinTable({
        name:'user-address',
        joinColumn: {name: 'user_id',referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'address_id',referencedColumnName: 'id'}
    })
    address: Address[]
}