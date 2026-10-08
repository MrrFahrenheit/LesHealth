import Chart from "@/modules/les/components/ui/Chart";
import HealthSignsPanel from "@/modules/les/components/ui/HealthSignsPanel";
import HealthStatItem from "@/modules/les/components/ui/HealthStatItem";
import TestResultsPanel from "@/modules/les/components/ui/TestResultsPanel";
import AIHealthInsights from "@/modules/les/components/ui/AIHealthInsights";
import {
    Heart,
    Moon,
    Activity,
    Droplets,
    Thermometer,
    Weight,
    FlaskConical,
    TestTube,
    FileText,
} from "lucide-react";

export default function Page() {
    return (
        <div className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            {/* Header */}
            <div className="w-full flex justify-center text-lg font-semibold text-black mb-6">
                <span>Tu salud, nuestra prioridad 💜</span>
            </div>

            {/* Grid Superior: 1 columna en móvil, 2 columnas en pantallas grandes (xl) */}
            <AIHealthInsights />
                {/* Columna Izquierda: Signos vitales */}
                <HealthSignsPanel />
            {/* Análisis y resultados */}
            <section className="max-w-7xl mx-auto">
                <div className="mb-4 px-1">
                    <h2 className="text-xl font-bold text-gray-900">
                        Tus análisis y resultados
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Revisa los resultados de tus últimos estudios.
                    </p>
                </div>

                <TestResultsPanel />
            </section>
        </div>
    );
}