import React, { ReactNode } from "react";
import { FaFacebook, FaUserMd, FaChartBar } from "react-icons/fa";
import Buterflies from "../../../../src/images/buterflies.png";
import Snap from "../../../../src/images/snap.png";
import Caos from "../../../../src/images/Caos.jpg";
import Image from "next/image";
import LesButton from "@/components/ui/buttons/LesButton";

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

            {/* =====================================================
                OLA LATERAL (Desktop)
            ====================================================== */}
            <div
                className="
                    hidden md:block
                    absolute top-0 -right-[120px]
                    w-[120px] h-full
                    z-20 pointer-events-none 
                "
            >
                <svg
                    className="w-full h-full"
                    viewBox="0 0 120 1000"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="
                            M0 0
                            C45 100, 105 180, 75 290
                            C45 390, 15 470, 65 570
                            C105 650, 25 760, 55 850
                            C75 915, 40 960, 0 1000
                            L0 1000 L0 0 Z
                        "
                        fill="#69409A"
                    />
                </svg>
            </div>

            {/* =====================================================
                DECORACIÓN INFERIOR
            ====================================================== */}
            <div
                className="
                    absolute -bottom-10 -left-10
                    w-[170px] h-[170px] rounded-full
                    border border-white/10 pointer-events-none
                "
            />
            <div
                className="
                    absolute -bottom-20 -left-20
                    w-[220px] h-[220px] rounded-full
                    border border-white/10 pointer-events-none
                "
            />

            {/* =====================================================
                OLA PARA MOBILE
            ====================================================== */}
            <div
                className="
                    md:hidden
                    absolute -bottom-[45px] left-0
                    w-full h-[70px]
                    z-20 pointer-events-none
                "
            >
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="
                            M0 0
                            C150 45, 250 90, 400 50
                            C550 10, 650 20, 750 55
                            C850 90, 930 70, 1000 20
                            L1000 100 L0 100 Z
                        "
                        fill="#69409A"
                    />
                </svg>
            </div>
        </div>
    );
}