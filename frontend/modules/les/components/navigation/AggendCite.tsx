import { useUser } from '@/providers/userProvider'
import { ArrowRight, Calendar } from 'lucide-react'
import DoctorImage from '../../../../src/images/doctor.png';
import React from 'react'
import Image from 'next/image';

export default function AggendCite() {

    const user = useUser();

    return (
        <section className="rounded-3xl p-4 flex flex-col-reverse md:flex-row items-center justify-between relative overflow-hidden">
                        <div className="z-10 flex flex-col items-start gap-4 max-w-lg">
                            <span className="text-xl font-medium text-gray-700 flex items-center gap-2">
                                👋 ¡Hola, {user?.full_name}!
                            </span>
                            <h1 className="text-4xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                Tu bienestar <br /> está en buenas manos
                            </h1>
                            <p className="text-gray-600 text-md mt-2 mb-4 max-w-xs">
                                Accede a especialistas, gestiona tus citas y cuida de tu salud de forma fácil y segura.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <button className="bg-[#5C328E] hover:bg-[#48276F] transition text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 text-xs">
                                    <Calendar className="w-4 h-4" />
                                    Agendar una cita
                                </button>
                                <button className="bg-white hover:bg-gray-50 transition text-[#5C328E] border border-gray-200 px-6 py-3 rounded-xl font-medium flex items-center gap-2 text-xs">
                                    Explorar especialistas
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        {/* Ilustración (Placeholder) */}
                        <div className="w-64 h-64 md:w-80 md:h-80 md:absolute md:-right-4 md:-bottom-4 z-0">
                            <Image
                                src={DoctorImage}
                                alt="Doctora"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </section>
    )
}
