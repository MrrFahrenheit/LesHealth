import { setAuthCookie } from "@/app/actions/auth-cookies";
import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";
import { LoginFormData } from "../schemas/AuthSchema";

export const LoginUser = async (loginFormData: LoginFormData) => {
    try {
        const result = await apiClient.post("auth/login", loginFormData);
        if (result.status === 200 || result.status === 201) {
            const token = result.data?.sesionCreated?.refresh_token;
            if (token) {
                await setAuthCookie(token);
            }
            return true;
        }
    } catch (error) {
        throw new Error(getErrorMessage(error, "No se pudo iniciar sesión."));
    }
    return false;
}