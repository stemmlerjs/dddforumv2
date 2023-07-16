import dotenv from 'dotenv';
import { stat, statSync } from 'fs';
import path from 'path';
import util from 'util';

import { logger } from './logger';

const statAsync = util.promisify(stat);

export const ensureAndLoadEnv = async (packageDirPath: string) => {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is not set');
  }

  const envFilePath = path.join(packageDirPath, `.env.${process.env.NODE_ENV}`);

  logger.info(`Reading env file ${envFilePath}`);

  if (!(await statAsync(envFilePath))) {
    throw new Error(`Could not find .env.${process.env.NODE_ENV} file`);
  }

  dotenv.config({ path: envFilePath });
  logger.info(`Env file ${envFilePath} has been loaded`);
};

export const ensureAndLoadEnvSync = (packageDirPath: string) => {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is not set');
  }

  const envFilePath = path.join(packageDirPath, `.env.${process.env.NODE_ENV}`);

  logger.info(`Reading env file ${envFilePath}`);

  if (!statSync(envFilePath)) {
    throw new Error(`Could not find .env.${process.env.NODE_ENV} file`);
  }

  dotenv.config({ path: envFilePath });
  logger.info(`Env file ${envFilePath} has been loaded`);
};
