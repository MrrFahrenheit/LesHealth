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
  HelpCircleIcon,
  Menu, // Ícono para el botón de abrir en móvil
  X     // Ícono para el botón de cerrar en móvil
} from "lucide-react";
import PurpleZoneDecorations from '@/components/ui/PurpleZoneDecorations'
import React, { useState } from 'react'
import NegativeLesHealthLogo from "../../../../src/logos/negativo1_sin_fondo.svg";
import Image from 'next/image';
import Link from 'next/link'; 
import { NavBarItem } from '../../types/navBarItem';

export const navBarInfo: Array<NavBarItem> = [
  { label: "Inicio", icon: Home, url: "/inicio" },
  { label: "Mi Salud", icon: HeartPulse, url: "/mi-salud" },
  { label: "Especialistas", icon: UserCheck, url: "/especialistas" },
  { label: "Citas Médicas", icon: Calendar, url: "/citas-medicas" },
  { label: "Prescripciones", icon: Pill, url: "/prescripciones" },
  { label: "Educación", icon: GraduationCap, url: "/educacion" },
  { label: "Comunidad", icon: Users, url: "/comunidad" },
];

export default function LeftNavBar() {
    // Estado para controlar el menú en pantallas pequeñas
    const [isOpen, setIsOpen] = useState(false);

    // Cierra el menú al hacer clic en cualquier enlace (solo afecta en móvil)
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* 1. Botón flotante para móviles (Invisible en 'md' hacia arriba) */}
            <button 
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-3 left-4 z-40 p-2 bg-[#48276F] text-white rounded-lg shadow-md"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* 2. Fondo oscuro (Overlay) para móviles */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/60 z-40"
                    onClick={closeMenu}
                />
            )}

            {/* 3. Contenedor de la Barra Lateral */}
            <div
                className={`
                    fixed top-0 left-0
                    w-[80%] md:w-[15%] /* 80% en móvil, 15% intacto en desktop */
                    min-h-screen md:h-screen 
                    bg-[#48276F]
                    text-white
                    flex flex-col
                    overflow-visible
                    z-50 md:z-10
                    px-8 lg:px-4 
                    /* Transición de entrada/salida */
                    transition-transform duration-300 ease-in-out
                    /* Lógica: Si está abierto translada a 0, si no a -100%. En 'md' SIEMPRE es 0 */
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Botón de cerrar dentro del menú (Invisible en 'md') */}
                <div className="md:hidden flex justify-end w-full mb-4">
                    <button onClick={closeMenu}>
                        <X className="w-6 h-6 text-gray-300 hover:text-white" />
                    </button>
                </div>

                {/* Logo */}
                <div className='w-full flex justify-center md:pb-0'>
                    <Image 
                        src={NegativeLesHealthLogo} 
                        width={160}
                        height={100} 
                        alt="Les Health Logo" 
                    />
                </div>

                {/* Menú de Navegación */}
                <nav className="flex flex-col gap-2 flex-1 md:overflow-y-auto overflow-y-scroll md:max-h-full max-h-96 w-full md:overflow-x-hidden">
                    {navBarInfo.map((current, index) => {
                        const Icon = current.icon;
                        
                        return (
                            <Link 
                                key={index} 
                                href={current.url}
                                onClick={closeMenu} // Cierra el menú en móvil al hacer clic
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
                    
                    {/* Botones inferiores (Configuración y Ayuda) */}
                    <div className="flex items-center w-full justify-center mt-1 border-t md:border-none border-white/10 pt-4 md:pt-0">
                        <Link 
                            href=""
                            onClick={closeMenu}
                            className="
                                flex items-center gap-4 
                                px-4 py-3 
                                rounded-xl 
                                transition-all duration-200
                                hover:bg-white/10 hover:translate-y-1
                            "
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </Link>
                        <Link 
                            href=""
                            onClick={closeMenu}
                            className="
                                flex items-center gap-4 
                                px-4 py-3 
                                rounded-xl 
                                transition-all duration-200
                                hover:bg-white/10 hover:translate-y-1
                            "
                        >
                            <HelpCircleIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </nav>

                <PurpleZoneDecorations color="#48276F" />
            </div>
        </>
    )
}