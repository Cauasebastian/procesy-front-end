// src/utils/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL não está definido.");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Padrão para as rotas que exigem chave privada
const PRIVATE_KEY_ROUTES = /^\/api\/documento-processo/; // Regex para match das rotas

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const privateKey = localStorage.getItem("privateKey");

    // Configuração base para todas as requisições
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Adiciona chave privada apenas para rotas específicas
    if (privateKey && PRIVATE_KEY_ROUTES.test(config.url)) {
      config.headers['X-Private-Key'] = privateKey; // Nome correto do header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;