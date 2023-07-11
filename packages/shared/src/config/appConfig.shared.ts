const apiUrl = process.env.REACT_APP_API_URL ?? '';
const frontendUrl = process.env.REACT_APP_FRONTEND_URL ?? '';

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
