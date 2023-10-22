import { MigrationInterface, QueryRunner } from "typeorm";

export class ImporveTableStructure1698008286340 implements MigrationInterface {
    name = 'ImporveTableStructure1698008286340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "deeplink"`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "deep_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "deep_link"`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "deeplink" character varying NOT NULL`);
    }

}
