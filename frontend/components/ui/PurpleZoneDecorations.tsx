import React from 'react'

export default function PurpleZoneDecorations({color = "#69409A"} : {color:string}) {
    return (
        <>
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
                        fill={color}
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
                    border border-white/10 pointer-events-none overflow-hidden
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
                        fill={color}
                    />
                </svg>
            </div>
        </>
    )
}
