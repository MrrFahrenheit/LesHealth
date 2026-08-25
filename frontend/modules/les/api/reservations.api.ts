import { apiClient } from '@/lib/api-client';

export type Reservation = {
  id: string;
  patient_id: string;
  doctor_id: string;
  reservation_date: string;
  status: string;
  notes: string;
  les_user_les_user_reservation_doctor_idToles_user: {
    full_name: string;
    specialty: string;
  };
};

export const getPatientReservations = async (): Promise<Reservation[]> => {
  const { data } = await apiClient.get(`/reservation/patient`);
  console.log(data)
  return data;
};

export const createReservation = async (reservationData: { doctor_id: string; reservation_date: string; notes?: string }) => {
  const { data } = await apiClient.post('/reservation', reservationData);
  return data;
};

export const updateReservationStatus = async (id: string, status: string) => {
  const { data } = await apiClient.patch(`/reservation/${id}`, { status });
  return data;
};

