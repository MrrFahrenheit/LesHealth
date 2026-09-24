"use client";

import { Bell, Search } from "lucide-react";
import UVIndex from "./UVIndex";
import { useUser } from "@/providers/userProvider";
import Link from "next/link";

export default function TopNavBar() {
    const lesUser = useUser();

    return (
        <header
            className="
                fixed top-0 right-0
                w-[80%]
                h-[8%] min-h-[64px]
                flex items-center justify-between
                z-10
                px-8 py-2
                backdrop-blur-md
                border-b border-white/10
            "
        >
            {/* Búsqueda */}
            <nav className="w-3/5 flex items-center justify-center">
                <div className="flex items-center w-4/5 h-8 bg-gray-200 rounded-md overflow-hidden px-3">
                    <Search className="h-5 w-5 text-gray-500" />

                    <input
                        className="
                            w-full h-full
                            text-sm
                            bg-transparent
                            outline-none
                            text-black
                            placeholder-gray-500
                            ml-3
                            secondary-font
                        "
                        type="text"
                        placeholder="Buscar especialistas, artículos, síntomas..."
                    />
                </div>
            </nav>

            {/* Información + acciones */}
            <div className="flex items-center gap-5">

                {/* Índice UV */}
                <UVIndex />

                {/* Notificaciones */}
                <button className="relative text-gray-300 hover:text-white transition-colors">
                    <Bell className="h-6 w-6" />

                    <span
                        className="
                            absolute top-0 right-0
                            w-2.5 h-2.5
                            bg-[#69409A]
                            rounded-full
                            border-2 border-gray-900
                        "
                    />
                </button>

                {/* Perfil */}
                <Link href={`/les/user`} className="flex items-center gap-2">
                <button
                    className="
                        flex items-center justify-center
                        w-10 h-10
                        rounded-full
                        bg-gradient-to-tr
                        from-blue-500 to-purple-500
                        text-white
                        font-medium
                        shadow-lg
                        hover:opacity-90
                        transition-opacity
                        ring-2 ring-white/20
                    "
                >
                    <span className="text-sm">{lesUser?.full_name.charAt(0) || 'U'}</span>
                </button>
                </Link>
            </div>
        </header>
    );
}