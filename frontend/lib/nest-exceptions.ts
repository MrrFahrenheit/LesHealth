// src/utils/handle-api-error.ts
import { isAxiosError } from "axios";

export interface NestErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export const getErrorMessage = (err: unknown, defaultMessage: string): string => {
  if (isAxiosError<NestErrorResponse>(err)) {
    // Si la API devolvió respuesta HTTP (400, 401, 409, 500, etc.)
    if (err.response?.data?.message) {
      const message = err.response.data.message;
      return Array.isArray(message) ? message.join(", ") : message;
    }
    
    // Si no hubo respuesta pero sí petición (ej. Servidor caído o error de red)
    if (err.request) {
      return "No se pudo conectar con el servidor. Revisa tu conexión.";
    }
  }

  // Errores JS estándar
  if (err instanceof Error) {
    return err.message;
  }

  return defaultMessage;
};