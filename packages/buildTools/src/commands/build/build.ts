#!/usr/bin/env ts-node

import { logger } from '@dddforum/shared/src/logger';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

import { loadPackageJson } from '../../utils/loadPackageJson';
import { loadTsconfigJson } from '../../utils/loadTsconfigJson';

const execAsync = util.promisify(exec);

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
    relativeTsconfigPath: options.tsconfigPath,
  });
  const execParams = {
    cwd: packageJsonDirPath,
  } as const;

  logger.info(`Building package ${packageJson.name}`);

  const tsAliasesReplacerPath = path.join(__dirname, 'tsAliasesReplacer.js');

  await execAsync(`tsc -b ${tsconfigPath} && tsc-alias -p ${tsconfigPath} -r ${tsAliasesReplacerPath}`, execParams);

  logger.info(`Package ${packageJson.name} has been built`);
};
