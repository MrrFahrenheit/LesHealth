import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";

export const sendVerificationCode = async (email: string) => {
    try {
        const result = await apiClient.post("auth/send-verification", { email });
        return result.status === 200;
    } catch (err) {
        const parsedError = getErrorMessage(err, "m");
        console.log(parsedError);
        return false;
    }
}

