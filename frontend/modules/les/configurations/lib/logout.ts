import { deleteAuthCookie } from "@/app/actions/auth-cookies";
import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";

export const logoutUser = async () => {
    try {
        await apiClient.post("/auth/logout");
        await deleteAuthCookie();
        return true;
    } catch (err) {
        const error = getErrorMessage(err, "m");
        console.error("Logout error:", error);
        return false;
    } finally {
        localStorage.removeItem("user-storage");
        localStorage.clear(); 
        window.location.href = "/get-started/auth";
    }
};
