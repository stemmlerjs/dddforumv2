#!/usr/bin/env ts-node

import { Command } from '@commander-js/extra-typings';

import { version } from '../package.json';
import { bindBuild } from './bindBuild';
import { bindMigrate } from './bindMigrate';
import { bindPrepareEnv } from './bindPrepareEnv';

const program = new Command();

program.name('@DDD forum BP CLI').description('CLI to simplify @DDD forum scripting and building').version(version);

bindBuild(program);
bindPrepareEnv(program);
bindMigrate(program);

program.parse();
