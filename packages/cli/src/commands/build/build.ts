#!/usr/bin/env ts-node

import { logger } from '@dddforum/shared/src/logger';
import { SpawnOptions } from 'child_process';
import execSh from 'exec-sh';
import path from 'path';

import { loadPackageJson } from '../../utils/loadPackageJson';
import { loadTsconfigJson } from '../../utils/loadTsconfigJson';

const { promise: asyncExecSh } = execSh;

interface BuildOptions {
  cwd?: string;
  tsconfigPath: string;
}

export const build = async (options: BuildOptions) => {
  const cwd = options.cwd ?? process.cwd();
  logger.info(`Building in ${cwd}`);

  const { packageJson, packageJsonDirPath } = await loadPackageJson({ cwd });
  const { tsconfigPath } = await loadTsconfigJson({
    cwd,
    tsconfigPath: options.tsconfigPath,
  });
  const spawnOptions: SpawnOptions = {
    cwd: packageJsonDirPath,
    stdio: 'inherit',
  };

  logger.info(`Building package ${packageJson.name}`);

  const tsAliasesReplacerPath = path.join(__dirname, 'tsAliasesReplacer.js');

  await asyncExecSh(`tsc -b ${tsconfigPath} && tsc-alias -p ${tsconfigPath} -r ${tsAliasesReplacerPath}`, spawnOptions);

  logger.info(`Package ${packageJson.name} has been built`);
};
