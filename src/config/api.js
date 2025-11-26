// Configuración de API según entorno
const API_CONFIG = {
  development: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  },
  production: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  }
};

const environment = import.meta.env.MODE || 'development';
const config = API_CONFIG[environment];

export default config;
