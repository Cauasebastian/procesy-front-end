// src/utils/axiosConfig.js
import axios from 'axios';

// Configuração dinâmica para diferentes ambientes
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENV = import.meta.env.MODE;

if (!API_BASE_URL) {
  const errorMessage = ENV === 'development' 
    ? "Variável VITE_API_BASE_URL não definida. Crie um arquivo .env.local com o valor de desenvolvimento." 
    : "Variável VITE_API_BASE_URL não definida no ambiente de produção.";

  console.error(`ERRO CRÍTICO: ${errorMessage}`);
  
  if (ENV === 'development') {
    console.info("Dica: Adicione no .env.local: VITE_API_BASE_URL=http://localhost:8080");
  }
  
  throw new Error(errorMessage);
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

// Rotas que exigem chave privada
const PRIVATE_KEY_ROUTES = [
  /^\/api\/documento-processo/, 
  // Adicione outras rotas aqui quando necessário
];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const privateKey = localStorage.getItem("privateKey");

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Verifica se a rota requer chave privada
    const requiresPrivateKey = PRIVATE_KEY_ROUTES.some(regex => 
      regex.test(config.url)
    );

    if (privateKey && requiresPrivateKey) {
      config.headers['X-Private-Key'] = privateKey;
    } else if (requiresPrivateKey) {
      console.warn(`Atenção: Rota privada acessada sem chave - ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para tratamento global de erros
axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Não autorizado - Redirecionando para login");
          // Adicione redirecionamento para login aqui se necessário
          break;
        case 403:
          console.error("Acesso proibido - Verifique suas permissões");
          break;
        default:
          console.error(`Erro na requisição: ${error.message}`);
      }
    } else {
      console.error("Erro de conexão ou timeout", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;