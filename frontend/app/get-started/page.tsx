'use client'

import LesButton from '@/components/ui/buttons/LesButton'
import React from 'react'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'
import {
    FaHeartbeat,
    FaAppleAlt,
    FaDumbbell,
    FaBrain,
    FaStethoscope
} from 'react-icons/fa'
import { usePathname, useRouter } from 'next/navigation';
import LesHealthLogo from '@/components/ui/LesHealthLogo'

export default function Page() {
    const router = useRouter();
    const pathName = usePathname();

    const handleNavigate = (site: string) => {
        router.push(`${pathName}/${site}`);
    }

    return (
        <>
            <div className="relative w-full min-h-full flex flex-col justify-center py-4 px-8 overflow-hidden items-center">
        

                {/* =====================================================
                ICONOS FLOTANTES DECORATIVOS (Fondo)
            ====================================================== */}

                {/* Salud general */}
                <div className="absolute top-10 left-8 text-[#D2B5D8] -rotate-12 animate-pulse pointer-events-none">
                    <FaHeartbeat size={80} />
                </div>

                {/* Nutrición */}
                <div className="absolute bottom-20 left-12 text-[#D2B5D8] rotate-12 pointer-events-none">
                    <FaAppleAlt size={70} />
                </div>

                {/* Ejercicio */}
                <div className="absolute top-24 right-10 text-[#D2B5D8] rotate-45 pointer-events-none">
                    <FaDumbbell size={75} />
                </div>

                {/* Salud Mental */}
                <div className="absolute bottom-12 right-16 text-[#D2B5D8] -rotate-12 animate-pulse pointer-events-none">
                    <FaBrain size={85} />
                </div>

                {/* Medicina / Doctores */}
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 text-[#D2B5D8] rotate-90 pointer-events-none">
                    <FaStethoscope size={120} />
                </div>


                {/* =====================================================
                CONTENIDO PRINCIPAL (Frente)
            ====================================================== */}
                <div className="z-10 flex flex-col gap-6 w-2/3">
                    <h3 className="principal-font text-3xl md:text-4xl text-[#7A4D9A] leading-tight">
                        Tu Bienestar Empieza Aqui
                    </h3>

                    <p className="nunito text-[#48276F] font-bold text-base md:text-lg leading-relaxed">
                        Conecta con nuestra comunidad de doctores especialistas en tratamiento, nutricion, ejercicio y salud
                        mental. Unete a una red de protagonistas que enfrentan esta condicion compartiendo recomendaciones, estadisticas,
                        control y seguimiento integral.
                    </p>

                    <div className="w-full mt-6 flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-center md:space-x-8 text-white">
                        <LesButton icon={<FiLogIn size={24} />} text="Comienza ahora" onClickFun={() => handleNavigate("/auth")} />
                    </div>
                </div>

            </div>
        </>
    )
}