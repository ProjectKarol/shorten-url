import { MigrationInterface, QueryRunner } from "typeorm";

export class ImporveTableConstrains1698010472978 implements MigrationInterface {
    name = 'ImporveTableConstrains1698010472978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "web_url"`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "web_url" character varying(355) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD CONSTRAINT "UQ_1f0f1d5145614967a0a6acaaaa0" UNIQUE ("web_url")`);
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "deep_link"`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "deep_link" character varying(355) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD CONSTRAINT "UQ_5aa520cc929e12af488207d9117" UNIQUE ("deep_link")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversions" DROP CONSTRAINT "UQ_5aa520cc929e12af488207d9117"`);
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "deep_link"`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "deep_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversions" DROP CONSTRAINT "UQ_1f0f1d5145614967a0a6acaaaa0"`);
        await queryRunner.query(`ALTER TABLE "conversions" DROP COLUMN "web_url"`);
        await queryRunner.query(`ALTER TABLE "conversions" ADD "web_url" character varying NOT NULL`);
    }

}
