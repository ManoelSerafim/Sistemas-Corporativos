import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionaValorEstimado1790195981897 implements MigrationInterface {
    name = 'AdicionaValorEstimado1790195981897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitacoes" ADD "valor_estimado" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitacoes" DROP COLUMN "valor_estimado"`);
    }

}
