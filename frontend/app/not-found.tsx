import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration with nature colors */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center p-8 max-w-lg">
        {/* Animated SVGs */}
        <div className="relative w-full h-40 mb-8 flex items-center justify-center">
            
            {/* Butterfly (Floating/Bouncing animation) */}
            <div className="absolute left-10 top-0 animate-[bounce_3s_infinite]">
                <svg className="text-[#69409A]" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Top wings */}
                    <path d="M12 12C9 9 6 4 4 4C4 4 2 6 3 10C4 13 8 15 12 15C16 15 20 13 21 10C22 6 20 4 20 4C18 4 15 9 12 12Z"/>
                    {/* Bottom wings */}
                    <path d="M12 12C9 14 6 18 5 20C5 20 8 21 10 19C11 17.5 12 15 12 15C12 15 13 17.5 14 19C16 21 19 20 19 20C18 18 15 14 12 12Z"/>
                    {/* Body */}
                    <path d="M12 4V16" strokeWidth="2.5" />
                    {/* Antennae */}
                    <path d="M12 4C12 4 11 2 9 2" />
                    <path d="M12 4C12 4 13 2 15 2" />
                </svg>
            </div>
            
            {/* Dragonfly (Pulse/Floating animation) */}
            <div className="absolute right-12 top-10 animate-[pulse_4s_infinite]">
                <svg className="text-emerald-500" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Body */}
                    <path d="M12 2V22" strokeWidth="2"/>
                    {/* Top Wings */}
                    <path d="M12 6C8 3 4 3 2 4C6 8 12 8 12 8" />
                    <path d="M12 6C16 3 20 3 22 4C18 8 12 8 12 8" />
                    {/* Bottom Wings */}
                    <path d="M12 10C9 8 5 8 3 9C6 11 12 11 12 11" />
                    <path d="M12 10C15 8 19 8 21 9C18 11 12 11 12 11" />
                    {/* Head */}
                    <circle cx="12" cy="2" r="1.5" fill="currentColor"/>
                </svg>
            </div>

            <h1 className="text-9xl font-black text-[#69409A] opacity-[0.15] relative z-0">404</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Oops! Te has perdido en el jardín
        </h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          La página que estás buscando parece que voló lejos. Tal vez la dirección esté escrita incorrectamente o la página haya sido movida.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#69409A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] hover:-translate-y-0.5 active:scale-95"
        >
          Volver a un lugar seguro
        </Link>
      </div>
    </div>
  );
}
