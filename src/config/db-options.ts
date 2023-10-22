import path from 'path';
import { DataSourceOptions, Logger } from 'typeorm';
import { config } from './config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { createLogger } from 'winston';

// If the parent directory is src, it is started with ts-node, otherwise it is pretranspiled and run with node.
const isDev = path.dirname(__dirname).split(path.sep).pop() === 'src';
const logger = createLogger();
const TYPE_ORM_LOG_MESSAGE = 'typeorm:log';
const dbLogger: Logger = {
  logQuery(query, parameters) {
    // console.log('typeorm:query', { query, parameters });
  },
  logQueryError(error, query, parameters) {
    throw new Error(`typeorm:error: ${error}, ${query}, ${parameters}`);
  },
  logQuerySlow(time, query, parameters) {
    logger.log('typeorm:slow', { time, query, parameters });
  },
  logSchemaBuild(msg) {
    logger.log('typeorm:schema-build', { msg });
  },
  logMigration(msg) {
    logger.log('typeorm:migration', { msg });
  },
  log(level: 'log' | 'info' | 'warn', msg) {
    switch (level) {
      case 'log':
        logger.log(TYPE_ORM_LOG_MESSAGE, { level, msg });
        break;
      case 'info':
        logger.log(TYPE_ORM_LOG_MESSAGE, { level, msg });
        break;
      case 'warn':
        logger.log(TYPE_ORM_LOG_MESSAGE, { level, msg });
        break;
    }
  },
};

export const dbOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  ssl: config.database.ssl,
  entities: [isDev ? 'src/entity/**/*.ts' : 'dist/entity/**/*.js'],
  migrations: [isDev ? 'src/migration/*.ts' : 'dist/migration/*.js'],
  logging: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  logger: dbLogger,
};
