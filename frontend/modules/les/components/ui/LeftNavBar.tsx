"use client";

import { 
  Home, 
  HeartPulse, 
  UserCheck, 
  Calendar, 
  FileText, 
  Pill, 
  GraduationCap, 
  Users,
  LucideIcon, 
  SettingsIcon,
  HelpCircleIcon
} from "lucide-react";
import PurpleZoneDecorations from '@/components/ui/PurpleZoneDecorations'
import React from 'react'
import NegativeLesHealthLogo from "../../../../src/logos/negativo1_sin_fondo.svg";
import Image from 'next/image';
import Link from 'next/link'; // Importante: Añadido para la navegación
import { NavBarItem } from '../../types/navBarItem';

export const navBarInfo: Array<NavBarItem> = [
  { label: "Inicio", icon: Home, url: "/inicio" },
  { label: "Mi Salud", icon: HeartPulse, url: "/mi-salud" },
  { label: "Especialistas", icon: UserCheck, url: "/especialistas" },
  { label: "Citas Médicas", icon: Calendar, url: "/citas-medicas" },
  { label: "Historial Clínico", icon: FileText, url: "/historial-clinico" },
  { label: "Prescripciones", icon: Pill, url: "/prescripciones" },
  { label: "Educación", icon: GraduationCap, url: "/educacion" },
  { label: "Comunidad", icon: Users, url: "/comunidad" },
];

export default function LeftNavBar() {
    return (
        <div
            className="
                w-full md:w-[15%]
                min-h-screen md:h-screen 
                bg-[#48276F]
                text-white
                flex flex-col
                overflow-visible
                z-10
                px-8 lg:px-4 /* Ajusté un poco el px para que el hover no toque los bordes */
                 /* Mejoré el padding vertical superior */
                fixed
            "
        >
            {/* Logo */}
            <div className='w-full flex justify-center'>
                <Image 
                    src={NegativeLesHealthLogo} 
                    width={160}
                    height={100} 
                    alt="Les Health Logo" 
                />
            </div>

            {/* Menú de Navegación */}
            <nav className="flex flex-col gap-2 flex-1">
                {navBarInfo.map((current, index) => {
                    // Extraemos el componente del ícono para poder renderizarlo como etiqueta JSX
                    const Icon = current.icon;
                    
                    return (
                        <Link 
                            key={index} 
                            href={current.url}
                            className="
                                flex items-center gap-4 
                                px-4 py-3 
                                rounded-xl 
                                transition-all duration-200
                                hover:bg-white/10 hover:translate-x-1
                            "
                        >
                            <Icon className="w-5 h-5 text-gray-300" />
                            <span className="font-medium text-sm text-gray-100">
                                {current.label}
                            </span>
                        </Link>
                    )
                })}
                <div className="flex items-center w-full justify-center">
                    <Link 
                            href=""
                            className="
                                flex items-center gap-4 
                                px-4 py-3 
                                rounded-xl 
                                transition-all duration-200
                                hover:bg-white/10 hover:translate-x-1
                            "
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </Link>
                        <Link 
                            href=""
                            className="
                                flex items-center gap-4 
                                px-4 py-3 
                                rounded-xl 
                                transition-all duration-200
                                hover:bg-white/10 hover:translate-x-1
                            "
                        >
                            <HelpCircleIcon className="w-5 h-5" />
                        </Link>
                </div>
            </nav>

            <PurpleZoneDecorations color="#48276F" />
        </div>
    )
}