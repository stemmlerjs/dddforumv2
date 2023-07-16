import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import execSh from 'exec-sh';

import { checkDocker } from '../utils/checkDocker';
import { getAbsolutePath } from '../utils/getAbsolutePath';
import { loadPackageJson } from '../utils/loadPackageJson';
import { migrate } from './migrate';

const { promise: asyncExecSh } = execSh;

interface PrepareEnvOptions {
  cwd?: string;
  packagePath?: string;
  dockerComposeFilePath: string;
  ormSchemaPath: string;
}

export const prepareEnv = async (options: PrepareEnvOptions) => {
  const cwd = options.cwd ?? process.cwd();
  const dockerComposeFilePath = getAbsolutePath({ cwd, path: options.dockerComposeFilePath });
  const ormSchemaPath = getAbsolutePath({ cwd, path: options.ormSchemaPath });

  logger.info(`Preparing environment in ${cwd}`);

  const { packageJsonDirPath, packageJson } = await loadPackageJson({ cwd });

  logger.info(`Preparing environment for ${packageJson.name}`);

  await ensureAndLoadEnv(packageJsonDirPath);

  await checkDocker();
  logger.info(`Starting docker-compose using ${dockerComposeFilePath}`);
  await asyncExecSh(`docker-compose -f ${dockerComposeFilePath} up --build -d`, {
    cwd: packageJsonDirPath,
  });

  logger.info(`Generating ORM client ${ormSchemaPath}`);
  await asyncExecSh(`prisma generate --schema ${ormSchemaPath}`, {
    cwd: packageJsonDirPath,
  });

  await migrate({ cwd, ormSchemaPath: options.ormSchemaPath });

  logger.info(`Environment has been prepared for ${packageJson.name}`);
};
