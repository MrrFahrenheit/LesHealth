import { apiClient } from '@/lib/api-client';

export type Doctor = {
  id: string;
  full_name: string;
  specialty: string;
  license_number: string;
};

export const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await apiClient.get('/user/doctors');
  return data;
};

