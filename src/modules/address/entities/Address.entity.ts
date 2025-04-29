import { CommonEntity } from "src/common/common.entity";
import { User } from "src/modules/users/entities/User";

import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity('Address')
export class Address extends CommonEntity{
    @Column({type:'varchar',name:'ID_USER',nullable:true})
    _id_User?:string

    @Column({type:'varchar',name:'ID_CEP',nullable:true})
    @Index('IDA_CEP')
    cep?:string

    @Column({type:'varchar',name:'ID_LOGRADOURO',nullable:true})
    logradouro?: string

    @Column({type:'varchar',name:'ID_COMPLEMENTO',nullable:true})
    complemento?: string

    @Column({type:'varchar',name:'ID_UNIDADE',nullable:true})
    unidade?: string

    @Column({type:'varchar',name:'ID_ABIRRO',nullable:true})
    bairro?: string

    @Column({type:'varchar',name:'ID_LOCALIDADE',nullable:true})
    localidade?: string

    @Column({type:'varchar',name:'ID_UF',nullable:true})
    @Index('IDA_UF')
    uf?:string

    @Column({type:'varchar',name:'ID_ESTADO',nullable:true})
    @Index('IDA_ESTADO')
    estado?:string

    @Column({type:'varchar',name:'ID_REGIAO',nullable:true})
    @Index('IDA_REGIAO')
    regiao?:string

    @Column({type:'varchar',name:'ID_IBGE',nullable:true})
    ibge?:string

    @Column({type:'varchar',name:'ID_GIA',nullable:true})
    gia?:string

    @Column({type:'varchar',name:'ID_DDD',nullable:true})
    ddd?: string

    @Column({type:'varchar',name:'ID_SIAFI',nullable:true})
    siafi?:string

    @ManyToOne(() => User,(user) => user.address)
    users:User[]
}