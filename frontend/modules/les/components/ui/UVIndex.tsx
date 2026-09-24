"use client";

import { getLupusUVRisk, LupusUVRisk } from "@/lib/get-lupus-uv-risk";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function UVIndex() {
    const [uvRisk, setUvRisk] = useState<LupusUVRisk | null>(null);
    const [loadingUV, setLoadingUV] = useState(true);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const getUV = () => {
            if (!navigator.geolocation) {
                setLoadingUV(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        const result = await getLupusUVRisk(
                            latitude,
                            longitude
                        );

                        setUvRisk(result);
                    } catch (error) {
                        console.error("Error obteniendo UV:", error);
                    } finally {
                        setLoadingUV(false);
                    }
                },
                (error) => {
                    console.error(
                        "No se pudo obtener la ubicación:",
                        error
                    );

                    setLoadingUV(false);
                },
                { timeout: 10000 }
            );
        };

        // Fetch immediately
        getUV();

        // And then every 15 minutes
        intervalId = setInterval(getUV, 15 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-50">
                <Sun className="w-5 h-5 text-yellow-500" />
            </div>

            <div className="hidden lg:flex flex-col leading-tight">
                <span className="text-xs text-gray-400">
                    Índice UV
                </span>

                {loadingUV ? (
                    <span className="text-sm text-gray-500">
                        Consultando...
                    </span>
                ) : uvRisk ? (
                    <span className="text-sm font-semibold text-gray-700">
                        {uvRisk.uvIndex} · {uvRisk.label}
                    </span>
                ) : (
                    <span className="text-sm text-gray-500">
                        No disponible
                    </span>
                )}
            </div>
        </div>
    );
}

