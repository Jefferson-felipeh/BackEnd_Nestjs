import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CommonEntityInterface } from "./interfaces/common-entity.interface";

@Entity()
export class CommonEntity implements CommonEntityInterface{
    //Essa entidade é um padrão específico para todas as outras entidades, pois todas terão
    //essas colunas específicas, e eu basicamente posso extender essa classe dessa entidade para 
    // as demais_

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @CreateDateColumn({type:Date,name:'CREATEDAT'})
    createdAt:Date

    @UpdateDateColumn({type:Date,name:'UPDATEDAT'})
    updatedAt:Date

    @DeleteDateColumn({type:Date,name:'DELETEDAT'})
    deletedAt:Date
}