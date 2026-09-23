import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarCentroCusto1790193986703 implements MigrationInterface {
    name = 'AlterarCentroCusto1790193986703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP COLUMN "exemplo_despesas"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD "exemplo_despesas" character varying(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP COLUMN "exemplo_despesas"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD "exemplo_despesas" character varying(30) NOT NULL`);
    }

}
