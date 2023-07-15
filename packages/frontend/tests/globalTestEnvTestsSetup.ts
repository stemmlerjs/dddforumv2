import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import path from 'path';

export default async (): Promise<void> => {
  logger.info('Starting global test env setup');

  await ensureAndLoadEnv(path.resolve(__dirname, '..'));
};
