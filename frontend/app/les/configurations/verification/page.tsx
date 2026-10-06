"use client";
import React, { useState } from "react";
import { uploadImageToR2 } from "@/lib/upload-image";
import { apiClient } from "@/lib/api-client";
import { ArrowLeft, Upload, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
    const router = useRouter();
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
        const file = e.target.files?.[0];
        if (file) {
            if (side === "front") setFrontImage(file);
            else setBackImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!frontImage || !backImage) {
            alert("Debes subir ambas caras de la cédula");
            return;
        }

        setLoading(true);
        try {
            // Subir ambas imágenes a R2
            const [frontUrl, backUrl] = await Promise.all([
                uploadImageToR2(frontImage, "verification"),
                uploadImageToR2(backImage, "verification"),
            ]);

            // Enviar la solicitud al backend
            await apiClient.post("/user/submit-verification", {
                license_front_url: frontUrl,
                license_back_url: backUrl,
            });

            setSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Error al enviar la solicitud. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                        <CheckCircle2 size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Solicitud enviada</h1>
                    <p className="text-gray-500 mb-8">
                        Hemos recibido tu solicitud de verificación. Nuestro equipo revisará tus documentos
                        y te notificará cuando tu cuenta haya sido aprobada para acceso de especialistas.
                    </p>
                    <Link
                        href="/les/configurations"
                        className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-[#69409A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#583383]"
                    >
                        Volver a configuración
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[800px]">
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        href="/les/configurations"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition hover:text-gray-900"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Verificación de Especialista
                        </h1>
                        <p className="text-sm text-gray-500">
                            Sube una foto de ambos lados de tu cédula profesional para verificar tu identidad.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                    <div className="space-y-8">
                        {/* Frente */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Foto frontal de la cédula
                            </label>
                            <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 transition hover:border-[#69409A] bg-gray-50">
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label
                                            htmlFor="front-upload"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-[#69409A] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#69409A] focus-within:ring-offset-2 hover:text-[#583383]"
                                        >
                                            <span>Subir archivo</span>
                                            <input
                                                id="front-upload"
                                                name="front-upload"
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={(e) => handleFileChange(e, "front")}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                    {frontImage && (
                                        <p className="mt-2 text-sm font-medium text-emerald-600">
                                            Seleccionado: {frontImage.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Reverso */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Foto posterior de la cédula
                            </label>
                            <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 transition hover:border-[#69409A] bg-gray-50">
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label
                                            htmlFor="back-upload"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-[#69409A] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#69409A] focus-within:ring-offset-2 hover:text-[#583383]"
                                        >
                                            <span>Subir archivo</span>
                                            <input
                                                id="back-upload"
                                                name="back-upload"
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={(e) => handleFileChange(e, "back")}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                    {backImage && (
                                        <p className="mt-2 text-sm font-medium text-emerald-600">
                                            Seleccionado: {backImage.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !frontImage || !backImage}
                            className="flex items-center gap-2 rounded-xl bg-[#69409A] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#583383] disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar documentos"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
