import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log(__dirname);

const rootDirectory = path.resolve(__dirname, '../../..');
const nodeModulesDir = path.join(rootDirectory, 'node_modules');

if (!fs.existsSync(nodeModulesDir)) {
  console.log('Node modules not found in parent directory. Running npm install...');

  try {
    execSync('npm ci', { cwd: rootDirectory, stdio: 'inherit' });
    console.log('npm ci completed successfully.');
  } catch (error) {
    console.error('npm ci failed:', error);
    process.exit(1);
  }
} else {
  console.log('Node modules found in parent directory. Skipping npm install.');
}
