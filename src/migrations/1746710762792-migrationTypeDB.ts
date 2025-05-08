import { MigrationInterface, QueryRunner } from "typeorm";

//Basicamente tenho uma série de comando que vão ser utilizados no terminal para gerar, criar, iniciar e etc, as migrações
//cujas migrações vão adicionar as modificações realizadas nas etidades específicas da minha aplicação;

//Arquivo de migração vazio a fim de que seja implementado ou adicionado a lógica para a migração das modificações das entidades para o banco de dados
export class MigrationTypeDB1746710762792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
