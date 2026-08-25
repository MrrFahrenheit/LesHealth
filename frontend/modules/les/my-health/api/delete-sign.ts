import { apiClient } from "@/lib/api-client"

export const deleteSign = async (signId: string) => {
    const result = await apiClient.delete(`sign/${signId}`);
    return result.data;
}

