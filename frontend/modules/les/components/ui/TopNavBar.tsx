"use client";

import { useUser } from "@/providers/userProvider";
import { Search } from "lucide-react";
import Link from "next/link";
import NotificationBell from "./NotificationBell";
import UVIndex from "./UVIndex";

export default function TopNavBar() {
    const lesUser = useUser();

    return (
        <header
            className="
                fixed top-0 right-0
                w-full md:w-[85%]
                min-h-[64px]
                flex items-center justify-end md:justify-between
                pl-16 md:pl-8 pr-4 md:pr-8 py-2
                backdrop-blur-md bg-white/70
                border-b border-gray-200/50 z-10
            "
        >
            {/* Búsqueda */}
            <nav className="hidden md:flex flex-1 max-w-md items-center justify-start mr-4">
                <div className="flex items-center w-full h-9 bg-white border border-gray-200 rounded-full overflow-hidden px-3 shadow-sm">
                    <Search className="h-4 w-4 text-gray-500" />

                    <input
                        className="
                            w-full h-full
                            text-sm
                            bg-transparent
                            outline-none
                            text-black
                            placeholder-gray-500
                            ml-2
                            secondary-font
                        "
                        type="text"
                        placeholder="Buscar especialistas, síntomas..."
                    />
                </div>
            </nav>

            {/* Información + acciones */}
            <div className="flex items-center gap-3 md:gap-5">

                {/* Índice UV */}
                <UVIndex />

                {/* Notificaciones */}
                <NotificationBell />

                {/* Perfil */}
                <Link href={`/les/user`} className="flex items-center gap-2">
                <button
                    className="
                        flex items-center justify-center
                        w-8 h-8 md:w-10 md:h-10
                        rounded-full
                        bg-gradient-to-tr
                        from-blue-500 to-purple-500
                        text-white
                        font-medium
                        shadow-lg
                        hover:opacity-90
                        transition-opacity
                        ring-2 ring-white
                    "
                >
                    <span className="text-xs md:text-sm">{lesUser?.full_name.charAt(0) || 'U'}</span>
                </button>
                </Link>
            </div>
        </header>
    );
}