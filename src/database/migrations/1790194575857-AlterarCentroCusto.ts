import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarCentroCusto1790194575857 implements MigrationInterface {
    name = 'AlterarCentroCusto1790194575857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "centrosCusto" ("id" SERIAL NOT NULL, "codigo" character varying(150) NOT NULL, "nome" character varying(150) NOT NULL, "exemplo_despesas" character varying(150) NOT NULL, "saldo" numeric NOT NULL DEFAULT '0', "versao" integer NOT NULL, "criada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "atualizada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_92c8558bacefa50a2289a2ba2bf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "centrosCusto"`);
    }

}
