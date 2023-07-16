import { logger } from '@dddforum/shared/src/logger';
import { stat } from 'fs';
import path from 'path';
import util from 'util';

export interface PackageJson {
  cwd: string;
  name: 'string';
}

interface LoadPackageJsonOptions {
  cwd?: string;
}

interface LoadPackageJsonResult {
  packageJson: PackageJson;
  packageJsonPath: string;
  packageJsonDirPath: string;
}

const statAsync = util.promisify(stat);

export const loadPackageJson = async (options: LoadPackageJsonOptions = {}): Promise<LoadPackageJsonResult> => {
  const cwd = options.cwd ?? process.cwd();

  const packageJsonPath = path.join(cwd, 'package.json');
  const packageJsonDirPath = path.dirname(packageJsonPath);

  logger.info(`Trying to load package.json in ${packageJsonDirPath}`);

  if (!(await statAsync(packageJsonPath))) {
    throw new Error(`Could not find package.json`);
  }

  const packageJson: PackageJson = await import(packageJsonPath);

  logger.info(`package.json has been loaded for ${packageJson.name}`);

  return {
    packageJson,
    packageJsonPath,
    packageJsonDirPath,
  };
};
