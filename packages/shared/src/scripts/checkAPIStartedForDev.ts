import * as http from 'http';

const PORT = 3000;
const TIMEOUT = 1000;

const checkBackendAPIStatus = () => {
  return new Promise((resolve, _reject) => {
    const request = http.get(`http://localhost:${PORT}/health`, (response: any) => {
      resolve(response.statusCode === 200);
    });

    request.on('error', () => {
      resolve(false);
    });
  });
};

setTimeout(async () => {
  const isBackendRunning = await checkBackendAPIStatus();

  if (isBackendRunning) {
    console.log(`Backend is running at port ${PORT}`);
    // Additional code or tests can be executed here
  } else {
    console.log(`Backend isn't yet running; make sure to start this up first before UI E2e tests. ${PORT}`);
    process.exit(1); // Terminate the script with a non-zero exit code
  }
}, TIMEOUT);
