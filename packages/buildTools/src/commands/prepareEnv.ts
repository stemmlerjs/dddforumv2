import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import { SpawnOptions } from 'child_process';
import execSh from 'exec-sh';
import path from 'path';

import { checkDocker } from '../utils/checkDocker';
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

  logger.info(`Preparing environment in ${cwd}`);

  const { packageJsonDirPath, packageJson } = await loadPackageJson({ cwd });

  const dockerComposeFilePath = path.isAbsolute(options.dockerComposeFilePath)
    ? options.dockerComposeFilePath
    : path.resolve(cwd, options.dockerComposeFilePath);
  const ormSchemaPath = path.isAbsolute(options.ormSchemaPath)
    ? options.ormSchemaPath
    : path.resolve(cwd, options.ormSchemaPath);

  const spawnOptions: SpawnOptions = {
    cwd: packageJsonDirPath,
    stdio: 'inherit',
  };

  logger.info(`Preparing environment for ${packageJson.name}`);

  await ensureAndLoadEnv(packageJsonDirPath);
  await checkDocker();

  logger.info(`Starting docker-compose using ${dockerComposeFilePath}`);

  await asyncExecSh(`docker-compose -f ${dockerComposeFilePath} up --build -d`, spawnOptions);

  logger.info(`Generating ORM client ${ormSchemaPath}`);

  await asyncExecSh(`prisma generate --schema ${ormSchemaPath}`, spawnOptions);
  await migrate({ cwd, ormSchemaPath: options.ormSchemaPath });

  logger.info(`Environment has been prepared for ${packageJson.name}`);
};
