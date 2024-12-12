// src/utils/axiosConfig.js
import axios from 'axios';

// Crie uma instância do axios com a baseURL da sua API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Ajuste conforme a URL do seu backend
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
