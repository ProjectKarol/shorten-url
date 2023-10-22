import dotenv from 'dotenv';
import convict from 'convict';
import { createRequiredStringFormat } from './utils';

dotenv.config();

const DEFAULT_PORT = 8081;
const DEFAULT_DATABASE_PORT = 5432;

export const tempConfig = convict({
  port: {
    env: 'ENV_NODE_PORT',
    default: DEFAULT_PORT,
  },
  database: {
    host: {
      env: 'DATABASE_HOST',
      default: '',
      format: createRequiredStringFormat('DATABASE_HOST'),
    },
    port: {
      env: 'DATABASE_PORT',
      default: DEFAULT_DATABASE_PORT,
    },
    username: {
      env: 'DATABASE_USERNAME',
      default: '',
      format: createRequiredStringFormat('DATABASE_USERNAME'),
    },
    password: {
      env: 'DATABASE_PASSWORD',
      default: '',
      format: createRequiredStringFormat('DATABASE_PASSWORD'),
    },
    database: {
      env: 'DATABASE_DATABASE',
      default: '',
      format: createRequiredStringFormat('DATABASE_DATABASE'),
    },
    ssl: {
      env: 'DATABASE_SSL',
      default: false,
      format: Boolean,
    }
  },
});

tempConfig.validate({ allowed: 'strict' });
export const config = tempConfig.getProperties();