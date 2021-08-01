require('dotenv').config();

const config = {
  API_URL: process.env.REACT_APP_API_URL,
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'token',
  REFRESH_TOKEN_KEY: process.env.REACT_APP_REFRESH_TOKEN_KEY || 'refreshToken',
};

export default config;
