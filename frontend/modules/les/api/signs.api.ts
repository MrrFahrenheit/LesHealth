import { apiClient } from '@/lib/api-client';

export type CreateSignData = {
    type: string;
    value: number;
    patient_id?: string;
};

export const createSign = async (data: CreateSignData) => {
    const response = await apiClient.post('/sign', data);
    return response.data;
};

