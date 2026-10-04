
import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";
import { RegisterFormData } from "../schemas/AuthSchema";

export const registerUser = async (registerFormData: RegisterFormData) => {
    try {
        const result = await apiClient.post("auth/register", registerFormData);
        if (result.status === 201 || result.status === 200) {
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
    } catch (err) {
        const parsedError = getErrorMessage(err, "m");
        throw new Error(parsedError);
    }
    return false;
}