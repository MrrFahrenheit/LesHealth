import { apiClient } from '@/lib/api-client';

export type DoctorProfile = {
  id: string;
  user_id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews_count: number;
  experience_years: number;
  location: string;
  modality: string;
  availability_status: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Doctor = {
  id: string;
  email: string;
  full_name: string;
  les_doctor_profile?: DoctorProfile;
};

export const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await apiClient.get('/user/doctors');
  return data;
};


export type Patient = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  les_user_medical_info?: any;
};

export const getMyPatients = async (): Promise<Patient[]> => {
  const { data } = await apiClient.get('/user/my-patients');
  return data;
};

