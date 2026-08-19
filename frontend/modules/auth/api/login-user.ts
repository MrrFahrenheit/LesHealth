import { apiClient } from "@/lib/api-client"
import { LoginFormData, RegisterFormData } from "../schemas/AuthSchema";

export const LoginUser = async(loginFormData:LoginFormData) => {
    try{
        
        const result = await apiClient.post<RegisterFormData>("auth/login", loginFormData);
        
    }catch(error){

    }
}