import { apiClient } from "@/lib/api-client"

export const updateSign = async (signId: string, type: string, value: number) => {
    const result = await apiClient.patch(`sign`, { id: signId, type, value });
    return result.data;
}

