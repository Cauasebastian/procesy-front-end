import axios from "axios";

export const api = axios.create({
    baseURL: 'VITE_API_BASE_URL' || 'http://localhost:8080',
   
})