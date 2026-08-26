import { apiClient } from "@/lib/api-client";
import { LoginFormData, RegisterFormData } from "../schemas/AuthSchema";

export const LoginUser = async (loginFormData: LoginFormData) => {
    try {
        const result = await apiClient.post<RegisterFormData>("auth/login", loginFormData);
        if (result.status == 200 || result.status == 201) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}