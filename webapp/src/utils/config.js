const defaultConfig = {
  API_URL: "http://localhost:8000"
};
const config = window.__CONFIG__
  ? { ...defaultConfig, ...window.__CONFIG__ }
  : defaultConfig;

export default config;
