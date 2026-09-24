import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";

export const logoutUser = async () => {
    try {
        await apiClient.post("/auth/logout");
        return true;
    } catch (err) {
        const error = getErrorMessage(err, "m");
        console.error("Logout error:", error);
        return false;
    } finally {
        // En frontend siempre borramos estado por seguridad, falle o no la red
        localStorage.removeItem("user-storage"); // Si usamos Zustand persist u otra caché local
        localStorage.clear(); 
        // Forzamos redirección fuerte (no next/navigation) para limpiar toda la RAM de React
        window.location.href = "/get-started/auth";
    }
};

