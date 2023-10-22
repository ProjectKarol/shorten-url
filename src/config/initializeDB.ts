import { DataSource } from 'typeorm';
import { dbOptions } from './db-options';

export const dbSource: DataSource = new DataSource(dbOptions);

export const initializeDB = async (): Promise<void> => {
  await dbSource.initialize()
    .then(() => {
      console.log('DB connected correctly');
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
};
