import { LesUser } from "@/types/user";
import { cookies } from "next/headers";

export const getMe = async (): Promise<LesUser | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("sesion_token")?.value; 
        if (!token) return null;

        const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
        // Eliminar trailing slash si existe para evitar url malformada (//auth/me)
        const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
        
        const response = await fetch(`${baseUrl}/auth/me`, {
            headers: {
                Cookie: `sesion_token=${token}`,
            },
            cache: "no-store", 
        });

        if (!response.ok) {
            console.error(`Error en getMe: El backend respondió con status ${response.status}`);
            return null;
        }

        const data: LesUser = await response.json();
        return data;
    } catch (error) {
        console.error("Error obteniendo usuario en el servidor (getMe):", error);
        return null;
    }
};