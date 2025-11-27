// Configuración de API según entorno
const API_CONFIG = {
  development: {
    baseURL: 'http://100.31.11.234:8080/api',
  },
  production: {
    baseURL: 'http://100.31.11.234:8080/api',
  }
};

const environment = import.meta.env.MODE || 'development';

// Permitir override desde variables de entorno (VITE_API_URL)
const config = {
  baseURL: import.meta.env.VITE_API_URL || API_CONFIG[environment].baseURL
};

console.log(`🔧 API Config - Environment: ${environment}, URL: ${config.baseURL}`);

export default config;
