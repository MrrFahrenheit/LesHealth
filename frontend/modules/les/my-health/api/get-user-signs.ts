import { apiClient } from "@/lib/api-client"

export const getUserSigns = async() => {
    const list = await apiClient.get('sign/all');

    return list.data;
}