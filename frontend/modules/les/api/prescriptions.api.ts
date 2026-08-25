import { apiClient } from '@/lib/api-client';

export type Prescription = {
  id: string;
  patient_id: string;
  doctor_id: string;
  description: string;
  prescribed_date: string;
  les_user_les_user_prescription_doctor_idToles_user: {
    full_name: string;
    specialty: string;
  };
};

export const getPatientPrescriptions = async (patientId: string): Promise<Prescription[]> => {
  if (!patientId) return [];
  const { data } = await apiClient.get(`/prescription/patient/${patientId}`);
  return data;
};

export const createPrescription = async (prescriptionData: { doctor_id: string; description: string; prescribed_date: string }) => {
  const { data } = await apiClient.post('/prescription', prescriptionData);
  return data;
};

