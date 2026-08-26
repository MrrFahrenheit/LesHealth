import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";
import { RegisterFormData } from "../schemas/AuthSchema";

export const registerUser = async (registerFormData: RegisterFormData) => {
    try {
        const result = await apiClient.post<RegisterFormData>("auth/register", registerFormData);
        if (result.status == 201 || result.status == 200) {
            return true;
        }
    } catch (err) {
        const parsedError = getErrorMessage(err, "m");
        console.log(parsedError)
        return false;
    }
    return false;
}