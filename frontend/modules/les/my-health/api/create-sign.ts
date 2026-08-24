import { apiClient } from "@/lib/api-client"
import { SignFormData } from "../schemas/SignSchema"

export const createSign = async (createSignDto: SignFormData) => {
    try {
        const result = await apiClient.post("sign",
            createSignDto)
        console.log(result)
        return result
    } catch (error) {

    }
}