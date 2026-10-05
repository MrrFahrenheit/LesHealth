import { apiClient } from '@/lib/api-client';

export type RoutineEvent = {
    id: string;
    routine_id: string;
    title: string;
    description: string | null;
    event_type: 'exercise' | 'medication';
    is_pending: boolean;
    scheduled_for: string | null;
    completed_at: string | null;
    created_at: string;
};

export type Routine = {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    frequency: string | null;
    is_active: boolean;
    created_at: string;
    les_routine_event: RoutineEvent[];
};

export const getUserRoutines = async (userId: string): Promise<Routine[]> => {
    const { data } = await apiClient.get(`/routine/user/${userId}`);
    return data;
};

export const updateRoutineEvent = async (eventId: string, updateData: Partial<RoutineEvent>): Promise<RoutineEvent> => {
    const { data } = await apiClient.patch(`/routine-event/${eventId}`, updateData);
    return data;
};
