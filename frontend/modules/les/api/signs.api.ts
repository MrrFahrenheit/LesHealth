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


export type TestResult = {
    id: string;
    test_name: string;
    value: string;
    unit: string | null;
    status: string | null;
    date: string;
};

export const getTestResults = async (): Promise<TestResult[]> => {
    const { data } = await apiClient.get('/sign/test-results');
    return data;
};

export const createTestResult = async (testData: Omit<TestResult, 'id'>) => {
    const { data } = await apiClient.post('/sign/test-results', testData);
    return data;
};

export const deleteTestResult = async (id: string) => {
    const { data } = await apiClient.delete(`/sign/test-results/${id}`);
    return data;
};

export const getAIInsights = async () => {
    const { data } = await apiClient.get('/sign/ai-insights');
    return data;
};
