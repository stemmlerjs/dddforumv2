import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

import { loadPackageJson } from '../utils/loadPackageJson';

interface MigrateOptions {
  cwd?: string;
  ormSchemaPath: string;
}

const execAsync = util.promisify(exec);

export const migrate = async (options: MigrateOptions) => {
  const cwd = options.cwd ?? process.cwd();

  logger.info(`Applying migrations in ${cwd}`);

  const { packageJsonDirPath, packageJson } = await loadPackageJson({ cwd });

  const ormSchemaPath = path.isAbsolute(options.ormSchemaPath)
    ? options.ormSchemaPath
    : path.resolve(cwd, options.ormSchemaPath);

  const execParams = {
    cwd: packageJsonDirPath,
  } as const;

  logger.info(`Use ${ormSchemaPath} to apply migrations`);

  await ensureAndLoadEnv(packageJsonDirPath);
  await execAsync(`prisma db push --schema ${ormSchemaPath}`, execParams);

  logger.info(`Migrations have been applied for ${packageJson.name}`);
};
