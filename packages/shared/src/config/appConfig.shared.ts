const apiUrl = process.env.DDDFORUM_API_URL ?? '';
const frontendUrl = process.env.DDDFORUM_FRONTEND_URL ?? '';

const config = {
  api: {
    url: apiUrl,
    port: 3000,
  },
  frontend: {
    url: frontendUrl,
    port: 3001,
  },
};

export { config };
