const fs = require('fs-extra');
const path = require('path');

// Check if the --project flag is provided
const projectFlagIndex = process.argv.indexOf('--project');
if (projectFlagIndex === -1 || projectFlagIndex === process.argv.length - 1) {
  throw new Error('No --project flag provided. Please specify a project.');
}
const project = process.argv[projectFlagIndex + 1];

// Check if the project is valid
if (project !== 'backend' && project !== 'frontend') {
  throw new Error('Invalid project. Project must be either "backend" or "frontend".');
}

const sourceDirectory = path.join(__dirname, '../');
const destinationBase = path.join(__dirname, '../../');

console.log(__dirname);
console.log(sourceDirectory);
console.log(destinationBase);
console.log(`Project: ${project}`);

// Define the folders to copy
const foldersToCopy = ['users', 'config'];

foldersToCopy.forEach((folder) => {
  const sourcePath = path.join(sourceDirectory, folder);
  const backendDestinationPath = path.join(destinationBase, 'backend/src/shared', folder);
  const frontendDestinationPath = path.join(destinationBase, 'frontend/src/shared', folder);

  try {
    if (project === 'backend') {
      fs.copySync(sourcePath, backendDestinationPath);
      console.log(`${folder} copied to backend successfully!`);
    } else {
      fs.copySync(sourcePath, frontendDestinationPath);
      console.log(`${folder} copied to frontend successfully!`);
    }
  } catch (error) {
    console.error(`Error copying ${folder} to ${project}:`, error);
  }
});