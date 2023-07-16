import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import { SpawnOptions } from 'child_process';
import execSh from 'exec-sh';
import path from 'path';

import { loadPackageJson } from '../utils/loadPackageJson';

const { promise: asyncExecSh } = execSh;

interface MigrateOptions {
  cwd?: string;
  ormSchemaPath: string;
}

export const migrate = async (options: MigrateOptions) => {
  const cwd = options.cwd ?? process.cwd();

  logger.info(`Applying migrations in ${cwd}`);

  const { packageJsonDirPath, packageJson } = await loadPackageJson({ cwd });

  const ormSchemaPath = path.isAbsolute(options.ormSchemaPath)
    ? options.ormSchemaPath
    : path.resolve(cwd, options.ormSchemaPath);

  const spawnOptions: SpawnOptions = {
    cwd: packageJsonDirPath,
    stdio: 'inherit',
  };

  logger.info(`Use ${ormSchemaPath} to apply migrations`);

  await ensureAndLoadEnv(packageJsonDirPath);
  await asyncExecSh(`prisma db push --schema ${ormSchemaPath}`, spawnOptions);

  logger.info(`Migrations have been applied for ${packageJson.name}`);
};
