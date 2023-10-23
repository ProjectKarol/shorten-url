import { Repository } from 'typeorm';
import { dbSource } from '../config/initializeDB';
import { Conversion } from '../entity/Conversion.entity';


export class ConversionRepository {
  private readonly repository: Repository<Conversion>;

  constructor() {
    this.repository = dbSource.manager.getRepository(Conversion);
  }

  async getByContractorData(deep_link: string): Promise<Conversion | null> {
    const entity = await this.repository.findOne({
      where: {
        deepLink: deep_link,

      },
    });

    if (!entity) {
      return null;
    }

    return entity;
  }

  async save(entity: Conversion): Promise<Conversion> {
    await this.repository.createQueryBuilder()
      .insert()
      .into(Conversion)
      .values(entity)
      .orUpdate(["web_url", "deep_link", "created_at", "updated_at"], ["web_url"])
      .execute();

    return entity;
  }


  async cleanupDatabase() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await this.repository.createQueryBuilder()
      .delete()
      .from(Conversion)
      .where("created_at < :sevenDaysAgo", { sevenDaysAgo })
      .execute();
  }
}
