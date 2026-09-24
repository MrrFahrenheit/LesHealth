import React, { ReactNode } from 'react'

export default function layout({ children } : { children:ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-[#F8F9FC]">
            <main className="w-full min-h-screen pt-16 pb-20 md:pb-0 md:pt-10 md:pl-[270px]">
                {children}
            </main>
        </div>
    )
}
