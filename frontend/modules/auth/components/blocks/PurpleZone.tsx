import React, { ReactNode } from "react";
import { FaFacebook, FaUserMd, FaChartBar } from "react-icons/fa";
import Buterflies from "../../../../src/images/buterflies.png";
import Snap from "../../../../src/images/snap.png";
import Caos from "../../../../src/images/Caos.jpg";
import Image from "next/image";
import LesButton from "@/components/ui/buttons/LesButton";
import PurpleZoneDecorations from "@/components/ui/PurpleZoneDecorations";

// 1. APLICAMOS DRY: Centralizamos los datos para evitar repetir estructura HTML
type Benefit = {
    id: number;
    icon: ReactNode;
    title: ReactNode;
    description: string;
};

const benefitsData: Benefit[] = [
    {
        id: 1,
        icon: (
            <Image
                src={Snap}
                alt="Perfil de salud"
                width={55}
                height={55}
                className="object-contain"
            />
        ),
        title: <>Configura tu perfil<br />de salud</>,
        description: "Cuéntanos sobre ti para ofrecerte recomendaciones personalizadas.",
    },
    {
        id: 2,
        icon: <FaUserMd size={40} className="text-[#69409A]" />,
        title: <>Conecta con<br />especialistas</>,
        description: "Accede a doctores en tratamiento, nutrición, ejercicio y salud mental.",
    },
    {
        id: 3,
        icon: <FaChartBar size={38} className="text-[#69409A]" />,
        title: <>Seguimiento<br />integral</>,
        description: "Estadísticas, control y seguimiento para lograr tus objetivos.",
    },
];

export default function PurpleZone() {
    return (
        <div
            className="
                relative
                w-full md:w-[40%]
                min-h-screen md:h-screen 
                bg-[#69409A]
                text-white
                flex flex-col
                justify-center
                overflow-visible
                z-10
                px-8 lg:px-12
                py-6
            "
        >
            {/* =====================================================
                CONTENIDO PRINCIPAL
            ====================================================== */}
            <div className="relative z-30 flex flex-col justify-center h-full gap-8 lg:gap-10">

                {/* -------------------------------------------------
                    ENCABEZADO
                -------------------------------------------------- */}

                {/* -------------------------------------------------
                    BENEFICIOS (Renderizado iterativo limpio)
                -------------------------------------------------- */}
                <div className="flex flex-col gap-6">
                    {benefitsData.map((benefit) => (
                        <div key={benefit.id} className="flex items-center gap-5">
                            <div
                                className="
                                    w-[75px] h-[75px] shrink-0
                                    rounded-2xl bg-white
                                    flex items-center justify-center
                                    shadow-xl shadow-black/20
                                "
                            >
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="secondary-font text-lg lg:text-xl font-bold">
                                    {benefit.title}
                                </h3>
                                <p className="secondary-font text-xs lg:text-sm mt-1 leading-relaxed text-white/90 max-w-[240px]">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* -------------------------------------------------
                    REDES SOCIALES
                -------------------------------------------------- */}
                <div>
                    <p className="secondary-font text-base font-semibold mb-3">
                        Síguenos en nuestras redes
                    </p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={Caos}
                            alt="Caos Comunicación"
                            width={110}
                            height={50}
                            className="w-[110px] h-[50px] object-cover rounded-xl"
                        />
                        <LesButton icon={<FaFacebook size={24} />} text="Facebook" />
                    </div>
                </div>
            </div>

            <PurpleZoneDecorations />
        </div>
    );
}