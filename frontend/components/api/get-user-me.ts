import { LesUser } from "@/types/user";
import { cookies } from "next/headers";

export const getMe = async (): Promise<LesUser | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("sesion_token")?.value; 
        if (!token) return null;

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/auth/me`, {
            headers: {
                Cookie: `sesion_token=${token}`,
            },
            cache: "no-store", 
        });

        if (!response.ok) return null;

        const data: LesUser = await response.json();
        return data;
    } catch (error) {
        console.error("Error obteniendo usuario en el servidor:", error);
        return null;
    }
};