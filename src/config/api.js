// Configuración de API según entorno
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8080/api',
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL || 'http://YOUR_EC2_BACKEND_IP:8080/api',
  }
};

const environment = import.meta.env.MODE || 'development';
const config = API_CONFIG[environment];

export default config;
