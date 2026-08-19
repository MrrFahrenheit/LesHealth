import { apiClient } from "@/lib/api-client"
import { RegisterFormData } from "../schemas/AuthSchema";
import { getErrorMessage } from "@/lib/nest-exceptions";

export const registerUser = async (registerFormData: RegisterFormData) => {
    try {
        const result = await apiClient.post<RegisterFormData>("auth/register", registerFormData);

    } catch (err) {


        const parsedError = getErrorMessage(err, "m");
        console.log(parsedError)
    }
}