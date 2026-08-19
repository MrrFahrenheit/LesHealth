import { apiClient } from "./api-client";

export type LupusUVRisk = {
    uvIndex: number;
    category: "low" | "moderate" | "high" | "very-high" | "extreme";
    riskLevel: "low" | "moderate" | "high" | "very-high" | "extreme";
    label: string;
    description: string;
    recommendation: string;
    protectionRequired: boolean;
    extraProtection: boolean;
};

export async function getLupusUVRisk(
    lat: number,
    lon: number
): Promise<LupusUVRisk> {
    const response = await apiClient.get("/uv", {
        params: {
            lat,
            lon,
        },
    });


    console.log(response)

    if (response.status < 200 || response.status >= 300) {
        throw new Error(`UV API error: ${response.status}`);
    }

    const data = await response.data.now;

    const uvIndex = Number(data.uvIndex ?? data.uvi ?? data.value);

    if (!Number.isFinite(uvIndex)) {
        throw new Error("Invalid UV index returned by API");
    }

    if (uvIndex < 3) {
        return {
            uvIndex,
            category: "low",
            riskLevel: "low",
            label: "Riesgo bajo",
            description:
                "La radiación UV es baja. Para personas con lupus, el riesgo por exposición UV es menor, aunque la fotosensibilidad puede variar entre personas.",
            recommendation:
                "Puedes realizar actividades al aire libre con las precauciones habituales.",
            protectionRequired: false,
            extraProtection: false,
        };
    }

    if (uvIndex <= 5) {
        return {
            uvIndex,
            category: "moderate",
            riskLevel: "moderate",
            label: "Precaución",
            description:
                "La radiación UV es moderada. Las personas con lupus pueden ser especialmente sensibles a la radiación ultravioleta.",
            recommendation:
                "Busca sombra durante las horas de mayor radiación y utiliza ropa protectora, sombrero y protector solar de amplio espectro.",
            protectionRequired: true,
            extraProtection: false,
        };
    }

    if (uvIndex <= 7) {
        return {
            uvIndex,
            category: "high",
            riskLevel: "high",
            label: "Riesgo alto",
            description:
                "La radiación UV es alta y puede representar un riesgo importante para personas con fotosensibilidad asociada al lupus.",
            recommendation:
                "Reduce la exposición directa al sol, especialmente alrededor del mediodía. Utiliza sombra, ropa protectora, sombrero y protector solar.",
            protectionRequired: true,
            extraProtection: true,
        };
    }

    if (uvIndex <= 10) {
        return {
            uvIndex,
            category: "very-high",
            riskLevel: "very-high",
            label: "Riesgo muy alto",
            description:
                "La radiación UV es muy alta. La exposición puede favorecer reacciones cutáneas y empeorar síntomas relacionados con la fotosensibilidad del lupus.",
            recommendation:
                "Evita la exposición directa al sol durante las horas centrales del día. Prioriza permanecer en lugares con sombra o interiores y utiliza protección solar completa.",
            protectionRequired: true,
            extraProtection: true,
        };
    }

    return {
        uvIndex,
        category: "extreme",
        riskLevel: "extreme",
        label: "Riesgo extremo",
        description:
            "La radiación UV es extrema. Las personas con lupus y fotosensibilidad deberían minimizar especialmente la exposición directa.",
        recommendation:
            "Evita salir durante las horas de mayor radiación siempre que sea posible. Si necesitas salir, utiliza sombra, ropa protectora, sombrero y protector solar de amplio espectro.",
        protectionRequired: true,
        extraProtection: true,
    };
}