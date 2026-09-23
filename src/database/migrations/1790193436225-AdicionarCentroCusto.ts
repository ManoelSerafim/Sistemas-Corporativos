import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionarCentroCusto1790193436225 implements MigrationInterface {
    name = 'AdicionarCentroCusto1790193436225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "centro-custo" ("codigo" SERIAL NOT NULL, "nome" character varying(150) NOT NULL, "exemplo_despesas" character varying(30) NOT NULL, "saldo" numeric NOT NULL DEFAULT '0', "versao" integer NOT NULL, "criada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "atualizada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ff5a1b30769ac736b8e83a71228" PRIMARY KEY ("codigo"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "centro-custo"`);
    }

}
