import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarCentroCusto1790193847256 implements MigrationInterface {
    name = 'AlterarCentroCusto1790193847256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP CONSTRAINT "PK_ff5a1b30769ac736b8e83a71228"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD CONSTRAINT "PK_f4ac65e00d9e11e625e4f507d6b" PRIMARY KEY ("codigo", "id")`);
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP CONSTRAINT "PK_f4ac65e00d9e11e625e4f507d6b"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD CONSTRAINT "PK_049cc480d0a39663d30b1afbfea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP COLUMN "codigo"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD "codigo" character varying(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP COLUMN "codigo"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD "codigo" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP CONSTRAINT "PK_049cc480d0a39663d30b1afbfea"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD CONSTRAINT "PK_f4ac65e00d9e11e625e4f507d6b" PRIMARY KEY ("codigo", "id")`);
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP CONSTRAINT "PK_f4ac65e00d9e11e625e4f507d6b"`);
        await queryRunner.query(`ALTER TABLE "centro-custo" ADD CONSTRAINT "PK_ff5a1b30769ac736b8e83a71228" PRIMARY KEY ("codigo")`);
        await queryRunner.query(`ALTER TABLE "centro-custo" DROP COLUMN "id"`);
    }

}
