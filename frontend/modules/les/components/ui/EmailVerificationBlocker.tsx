"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/nest-exceptions";
import { logoutUser } from "@/modules/les/configurations/lib/logout";

export default function EmailVerificationBlocker({ userEmail }: { userEmail: string }) {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            await apiClient.post("/auth/verify-email", { otp });
            // Forzar recarga para que layout vuelva a hacer getMe() y vea isemailverified = true
            window.location.reload();
        } catch (err) {
            setError(getErrorMessage(err, "m"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FC]">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EEFA] text-[#69409A]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                
                <h1 className="mb-2 text-2xl font-bold text-[#48276F]">Verifica tu correo</h1>
                <p className="mb-6 text-sm text-gray-500">
                    Hemos enviado un código de 6 dígitos a <b>{userEmail}</b>. 
                    Por favor ingrésalo abajo para activar tu cuenta.
                </p>

                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-center text-xl tracking-widest focus:border-[#69409A] focus:outline-none"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        required
                    />
                    
                    {error && <p className="mb-4 text-xs font-semibold text-red-500">{error}</p>}
                    
                    <button
                        type="submit"
                        disabled={isLoading || otp.length < 6}
                        className="w-full rounded-lg bg-[#48276F] p-3 text-sm font-bold text-white transition hover:bg-[#69409A] disabled:opacity-50"
                    >
                        {isLoading ? "Verificando..." : "Verificar Cuenta"}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={logoutUser}
                    className="mt-6 text-xs font-semibold text-gray-400 transition hover:text-gray-600"
                >
                    Cerrar Sesión / Usar otra cuenta
                </button>
            </div>
        </div>
    );
}

