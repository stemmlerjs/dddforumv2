
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log(__dirname);

const parentDirectory = path.join(__dirname, '../../');
const nodeModulesDir = path.join(parentDirectory, 'node_modules');

if (!fs.existsSync(nodeModulesDir)) {
  console.log('Node modules not found in parent directory. Running npm install...');

  try {
    execSync('npm install', { cwd: parentDirectory, stdio: 'inherit' });
    console.log('npm install completed successfully.');
  } catch (error) {
    console.error('npm install failed:', error);
    process.exit(1);
  }
} else {
  console.log('Node modules found in parent directory. Skipping npm install.');
}