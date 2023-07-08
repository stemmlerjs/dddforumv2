
const apiUrl = process.env.REACT_APP_API_URL;
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

const config = {
  api: {
    url: apiUrl,
  },
  frontend: {
    url: frontendUrl
  }
}

export { config };