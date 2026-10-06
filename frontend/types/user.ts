export type LesUser = {
    id: string;
    full_name: string;
    email: string;
    isemailverified: boolean;
    is_verified_doctor?: boolean;
    role?: string;
}