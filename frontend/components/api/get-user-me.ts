import { cookies } from "next/headers";
import { LesUser } from "@/types/user";

export const getMe = async (): Promise<LesUser | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("sesion_token")?.value; 
        if (!token) return null;

        const response = await fetch(`http://localhost:3000/auth/me`, {
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