import { logger } from '@dddforum/shared/src/logger';
import { stat } from 'fs';
import path from 'path';
import util from 'util';

import { getAbsolutePath } from './getAbsolutePath';

export interface TsconfigJson {
  // Refine interface when needed
  [key: string]: unknown;
}

interface LoadTsconfigJsonOptions {
  cwd?: string;
  tsconfigPath: string;
}

interface LoadTsconfigJsonResult {
  tsconfigJson: TsconfigJson;
  tsconfigPath: string;
  tsconfigDirPath: string;
}

const statAsync = util.promisify(stat);

export const loadTsconfigJson = async (options: LoadTsconfigJsonOptions): Promise<LoadTsconfigJsonResult> => {
  const cwd = options.cwd ?? process.cwd();
  const tsconfigPath = getAbsolutePath({ cwd, path: options.tsconfigPath });
  const tsconfigDirPath = path.dirname(tsconfigPath);

  logger.info(`Trying to load tsconfig in ${tsconfigDirPath}`);

  if (!(await statAsync(tsconfigPath))) {
    throw new Error(`Could not find tsconfig.json`);
  }

  const tsconfigJson: TsconfigJson = await import(tsconfigPath);

  logger.info(`tsconfig.json has been loaded`);

  return {
    tsconfigJson,
    tsconfigPath,
    tsconfigDirPath,
  };
};
