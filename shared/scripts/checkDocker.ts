const { execSync } = require('child_process');

// Function to check if a command exists
const commandExists = (command: any) => {
  try {
    execSync(`command -v ${command} 2>/dev/null`);
    return true;
  } catch (error) {
    return false;
  }
};

// Check if Docker is installed
if (!commandExists('docker')) {
  console.error('Docker is not installed.');
  console.error('Please install Docker by following the official Docker installation instructions:');
  console.error('https://docs.docker.com/get-docker/');
  process.exit(1);
}

// Check if Docker Compose is installed
if (!commandExists('docker-compose')) {
  console.error('Docker Compose is not installed.');
  console.error('Please install Docker Compose by following the official Docker Compose installation instructions:');
  console.error('https://docs.docker.com/compose/install/');
  process.exit(1);
}
