#!/usr/bin/env ts-node

import { logger } from '@dddforum/shared/src/logger';
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

  const { packageJson } = await loadPackageJson({ cwd });
  const { tsconfigPath } = await loadTsconfigJson({
    cwd,
    tsconfigPath: options.tsconfigPath,
  });

  logger.info(`Building package ${packageJson.name}`);

  logger.info(`Transpiling code`);
  await asyncExecSh(`tsc -b ${tsconfigPath}`, {
    stdio: 'inherit',
  });

  logger.info(`Post-processing imports`);
  const tsAliasesReplacerPath = path.join(__dirname, 'tsAliasesReplacer.js');
  await asyncExecSh(`tsc-alias -p ${tsconfigPath} -r ${tsAliasesReplacerPath}`, {
    stdio: 'inherit',
  });

  logger.info(`Package ${packageJson.name} has been built`);
};
