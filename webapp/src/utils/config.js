const isDev = process.env.NODE_ENV !== "production";

const defaultConfig = {
  API_URL: isDev
    ? "http://localhost:8000"
    : "https://auksjonsbua-backend.herokuapp.com"
};
const config = window.__CONFIG__
  ? { ...defaultConfig, ...window.__CONFIG__ }
  : defaultConfig;

export default config;
