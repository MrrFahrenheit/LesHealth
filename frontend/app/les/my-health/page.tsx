// src/app/les/dashboard/page.tsx (o la ruta que uses)
// ¡No lleva "use client"! Es un Server Component.

import Chart from "@/modules/les/components/ui/Chart";
import HealthSignsPanel from "@/modules/les/components/ui/HealthSignsPanel";
import HealthStatItem from "@/modules/les/components/ui/HealthStatItem";
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

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <HealthStatItem
                        icon={<FlaskConical className="w-5 h-5 text-purple-500" />}
                        iconBg="bg-purple-50"
                        title="Hemoglobina"
                        value="14.2"
                        unit="g/dL"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />
                    <HealthStatItem
                        icon={<TestTube className="w-5 h-5 text-blue-500" />}
                        iconBg="bg-blue-50"
                        title="Colesterol total"
                        value="178"
                        unit="mg/dL"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />
                    <HealthStatItem
                        icon={<Activity className="w-5 h-5 text-orange-500" />}
                        iconBg="bg-orange-50"
                        title="Triglicéridos"
                        value="124"
                        unit="mg/dL"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />
                    <HealthStatItem
                        icon={<Droplets className="w-5 h-5 text-cyan-500" />}
                        iconBg="bg-cyan-50"
                        title="Creatinina"
                        value="0.9"
                        unit="mg/dL"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />
                    <HealthStatItem
                        icon={<FileText className="w-5 h-5 text-emerald-500" />}
                        iconBg="bg-emerald-50"
                        title="Examen general de orina"
                        value="Normal"
                        unit=""
                        badgeText="Sin alteraciones"
                        badgeColor="bg-green-100 text-green-700"
                    />
                    <HealthStatItem
                        icon={<FlaskConical className="w-5 h-5 text-pink-500" />}
                        iconBg="bg-pink-50"
                        title="Proteína C reactiva"
                        value="2.1"
                        unit="mg/L"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />
                </div>
            </section>
        </div>
    );
}