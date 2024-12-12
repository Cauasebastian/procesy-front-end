// src/utils/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL não está definido.");
}
API_BASE_URL
// Crie uma instância do axios com a baseURL da sua API
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Ajuste conforme a URL do seu backend
});

// Adicione um interceptador para incluir o token de autenticação em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Certifique-se de que o token está armazenado no localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
