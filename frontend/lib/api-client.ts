// src/lib/api-client.ts
import axios from 'axios';

const baseURL = typeof window !== 'undefined' 
  ? '/api/proxy' 
  : (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/');

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para inyectar el JWT Token que devuelve NestJS
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta para manejar errores 401 y redireccionar
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirigir al inicio de sesión (solo en cliente)
      if (typeof window !== 'undefined') {
        if (window.location.pathname !== '/get-started/auth') {
          window.location.href = '/get-started/auth';
        }
      }
    }
    return Promise.reject(error);
  }
);