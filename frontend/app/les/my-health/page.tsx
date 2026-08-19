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
        <div className="flex-1 overflow-y-auto bg-[#F8F9FC] p-6 lg:p-8">
            {/* Header */}
            <div className="p-3 mb-6 w-full flex justify-center text-xl font-medium text-gray-700">
                <span>Tu salud, nuestra prioridad 💙</span>
            </div>

            {/* Signos vitales */}
            <section className="max-w-7xl mx-auto mb-8">
                <div className="mb-4 px-3">
                    <h2 className="text-xl font-bold text-gray-900">
                        Tus signos
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Consulta tus principales indicadores de salud.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <HealthStatItem
                        icon={<Heart className="w-5 h-5 text-red-500" />}
                        iconBg="bg-red-50"
                        title="Frecuencia cardíaca"
                        value="72"
                        unit="lpm"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />

                    <HealthStatItem
                        icon={<Activity className="w-5 h-5 text-[#5C328E]" />}
                        iconBg="bg-purple-50"
                        title="Presión arterial"
                        value="120/80"
                        unit="mmHg"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />

                    <HealthStatItem
                        icon={<Droplets className="w-5 h-5 text-blue-500" />}
                        iconBg="bg-blue-50"
                        title="Glucosa"
                        value="92"
                        unit="mg/dL"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />

                    <HealthStatItem
                        icon={<Thermometer className="w-5 h-5 text-orange-500" />}
                        iconBg="bg-orange-50"
                        title="Temperatura"
                        value="36.6"
                        unit="°C"
                        badgeText="Normal"
                        badgeColor="bg-green-100 text-green-700"
                    />

                    <HealthStatItem
                        icon={<Moon className="w-5 h-5 text-indigo-500" />}
                        iconBg="bg-indigo-50"
                        title="Calidad del sueño"
                        value="7.8"
                        unit="h"
                        badgeText="Buena"
                        badgeColor="bg-blue-100 text-blue-700"
                    />

                    <HealthStatItem
                        icon={<Weight className="w-5 h-5 text-teal-500" />}
                        iconBg="bg-teal-50"
                        title="Peso"
                        value="68"
                        unit="kg"
                        badgeText="Estable"
                        badgeColor="bg-blue-100 text-blue-700"
                    />
                </div>
            </section>

            {/* Análisis y resultados */}
            <section className="max-w-7xl mx-auto">
                <div className="mb-4 px-3">
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