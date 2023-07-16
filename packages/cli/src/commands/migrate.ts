import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import execSh from 'exec-sh';

import { getAbsolutePath } from '../utils/getAbsolutePath';
import { loadPackageJson } from '../utils/loadPackageJson';

const { promise: asyncExecSh } = execSh;

interface MigrateOptions {
  cwd?: string;
  ormSchemaPath: string;
}

export const migrate = async (options: MigrateOptions) => {
  const cwd = options.cwd ?? process.cwd();
  const ormSchemaPath = getAbsolutePath({ cwd, path: options.ormSchemaPath });

  logger.info(`Applying migrations in ${cwd}`);

  const { packageJsonDirPath, packageJson } = await loadPackageJson({ cwd });

  await ensureAndLoadEnv(packageJsonDirPath);

  logger.info(`Use ${ormSchemaPath} to apply migrations`);
  await asyncExecSh(`prisma db push --schema ${ormSchemaPath}`, {
    cwd: packageJsonDirPath,
  });

  logger.info(`Migrations have been applied for ${packageJson.name}`);
};
