import { apiClient } from '@/lib/api-client';

export type PrescriptionItem = {
  id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration_days: number | null;
  notes: string | null;
};

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
  les_prescription_item: PrescriptionItem[];
};

export const getPatientPrescriptions = async (): Promise<Prescription[]> => {
  const { data } = await apiClient.get(`/prescription/patient/`);
  return data;
};

export const createPrescription = async (prescriptionData: { 
    doctor_id: string; 
    description: string; 
    prescribed_date: string;
    medications: Omit<PrescriptionItem, 'id'>[];
}) => {
  const { data } = await apiClient.post('/prescription', prescriptionData);
  return data;
};
