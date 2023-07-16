import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

import { checkDocker } from '../utils/checkDocker';
import { loadPackageJson } from '../utils/loadPackageJson';
import { migrate } from './migrate';

interface PrepareEnvOptions {
  cwd?: string;
  packagePath?: string;
  dockerComposeFilePath: string;
  ormSchemaPath: string;
}

const execAsync = util.promisify(exec);

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

  const execParams = {
    cwd: packageJsonDirPath,
  } as const;

  logger.info(`Preparing environment for ${packageJson.name}`);

  await ensureAndLoadEnv(packageJsonDirPath);
  await checkDocker();

  logger.info(`Starting docker-compose using ${dockerComposeFilePath}`);

  await execAsync(`docker-compose -f ${dockerComposeFilePath} up --build -d`, execParams);

  logger.info(`Generating ORM client ${ormSchemaPath}`);

  await execAsync(`prisma generate --schema ${ormSchemaPath}`, execParams);
  await migrate({ cwd, ormSchemaPath: options.ormSchemaPath });

  logger.info(`Environment has been prepared for ${packageJson.name}`);
};
