import { apiClient } from '@/lib/api-client';

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  les_doctor_profile?: {
    specialty: string;
    rating: string;
    reviews_count: number;
    experience_years: number;
    location: string;
    modality: string;
    availability_status: string;
    image_url: string;
    is_featured: boolean;
  };
  les_user_medical_info?: any[]; // Replace with correct type if needed
};

export const getUserProfile = async (id: string): Promise<UserProfile> => {
  const { data } = await apiClient.get(`/user/${id}`);
  return data;
};

