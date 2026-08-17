import LeftNavBar from '@/modules/les/components/ui/LeftNavBar'
import TopNavBar from '@/modules/les/components/ui/TopNavBar'
import React from 'react'

export default function layout() {
    return (
        <main className="relative flex flex-col-reverse min-h-screen w-full overflow-hidden bg-white md:flex-row md:gap-6">
            <LeftNavBar />
            <TopNavBar />
        </main>
    )
}
