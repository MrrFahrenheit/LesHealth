// src/lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

// Interceptor para inyectar el JWT Token que devuelve NestJS
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});