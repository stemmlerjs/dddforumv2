#!/usr/bin/env ts-node

import { Command } from '@commander-js/extra-typings';

import { version } from '../package.json';
import { bindBuild } from './bindBuild';
import { bindMigrate } from './bindMigrate';
import { bindPrepareEnv } from './bindPrepareEnv';

const program = new Command();

program.name('@DDD forum build utils').description('CLI to build @DDD forum packages').version(version);

bindBuild(program);
bindPrepareEnv(program);
bindMigrate(program);

program.parse();
