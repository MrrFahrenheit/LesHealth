import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";
import { LoginFormData, RegisterFormData } from "../schemas/AuthSchema";

export const LoginUser = async (loginFormData: LoginFormData) => {
    try {
        const result = await apiClient.post<RegisterFormData>("auth/login", loginFormData);
        if (result.status == 200 || result.status == 201) {
            return true;
        }
    } catch (error) {
        throw new Error(getErrorMessage(error, "No se pudo iniciar sesión."));
    }
    return false;
}