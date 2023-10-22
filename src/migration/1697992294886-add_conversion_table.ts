import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConversionTable1697992294886 implements MigrationInterface {
    name = 'AddConversionTable1697992294886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "web_url" character varying NOT NULL, "deeplink" character varying NOT NULL, CONSTRAINT "PK_4af8c6388f42a1849ee9b22fa16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4af8c6388f42a1849ee9b22fa1" ON "conversions" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4af8c6388f42a1849ee9b22fa1"`);
        await queryRunner.query(`DROP TABLE "conversions"`);
    }

}
