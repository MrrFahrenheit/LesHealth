// Importa tu InputField si deseas reemplazar el <input> nativo que dejé de ejemplo
import InputField from "@/components/ui/forms/InputField";

export default function TopNavBar() {
    return (
        <header className="
            fixed top-0 right-0
            w-[80%] /* Asumiendo que tu sidebar toma el 20% */
            h-[8%] min-h-[64px]
            text-white
            flex items-center justify-between
            z-10
            px-8 py-2
            backdrop-blur-md border-b border-white/10
        ">

            {/* 1. Barra de Búsqueda */}
            <nav className="w-3/5 flex items-center justify-center">
                {/* 1. El DIV padre tiene el color de fondo, los bordes y las esquinas redondeadas */}
                <div className="flex items-center w-4/5 h-8 bg-gray-200 rounded-md overflow-hidden px-3">

                    {/* 2. El ícono se queda a un lado */}
                    <div className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* 3. El input es TRANSPARENTE (bg-transparent) y sin bordes (outline-none) */}
                    <input
                        className="w-full h-full text-sm bg-transparent outline-none text-black placeholder-gray-500 ml-3 secondary-font"
                        type="text"
                        placeholder="Buscar especialistas, articulos, sintomas..."
                    />
                </div>
            </nav>

            {/* 2. Sección Derecha: Notificaciones y Perfil */}
            <div className="flex items-center gap-5">

                {/* Botón de Notificaciones */}
                <button className="relative text-gray-300 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {/* Punto rojo indicador de notificación */}
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#69409A] rounded-full border-2 border-gray-900"></span>
                </button>

                {/* Ícono de Perfil Conceptual (Avatar con iniciales) */}
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:opacity-90 transition-opacity ring-2 ring-white/20">
                    <span className="text-sm">UX</span>
                </button>
            </div>

        </header>
    );
}