import LesHealthLogo from '@/components/ui/LesHealthLogo'
import PurpleZone from '@/modules/auth/components/blocks/PurpleZone'
import React from 'react'

export default function layout({ children }: LayoutProps<"/">) {
    return (
        <main className="relative flex flex-col-reverse min-h-screen w-full overflow-hidden bg-white md:flex-row md:gap-6">
            <PurpleZone />
            {/* MITAD DERECHA (BLANCA) */}
            <div className="w-full md:w-2/3 flex flex-col items-center p-8 bg-white z-0">
                <div className="w-full flex flex-col items-center gap-3 text-center">
                    <LesHealthLogo />
                    {children}
                </div>
            </div>
        </main>
    )
}
