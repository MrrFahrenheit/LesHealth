import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";
import { LoginFormData } from "../schemas/AuthSchema";

export const LoginUser = async (loginFormData: LoginFormData) => {
    try {
        const result = await apiClient.post("auth/login", loginFormData);
        if (result.status === 200 || result.status === 201) {
            const token = result.data?.sesionCreated?.refresh_token;
            if (token) {
                // La cookie ya es inyectada automáticamente por el backend a través del proxy.
                // Guardamos en localStorage como respaldo para llamadas del cliente.
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', token);
                }
            }
            return true;
        }
    } catch (error) {
        throw new Error(getErrorMessage(error, "No se pudo iniciar sesión."));
    }
    return false;
}
