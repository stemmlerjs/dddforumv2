import { logger } from '@dddforum/shared/src/logger';
import commandExists from 'command-exists';

export const checkDocker = async () => {
  logger.info('Checking Docker and Docker Compose installation');

  // Check if Docker is installed
  if (!(await commandExists('docker'))) {
    console.error('Docker is not installed.');
    console.error('Please install Docker by following the official Docker installation instructions:');
    console.error('https://docs.docker.com/get-docker/');
    process.exit(1);
  }

  // Check if Docker Compose is installed
  if (!(await commandExists('docker-compose'))) {
    console.error('Docker Compose is not installed.');
    console.error('Please install Docker Compose by following the official Docker Compose installation instructions:');
    console.error('https://docs.docker.com/compose/install/');
    process.exit(1);
  }

  logger.info('Docker and Docker Compose are installed');
};
