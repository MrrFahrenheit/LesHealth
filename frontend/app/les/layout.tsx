import { getMe } from '@/components/api/get-user-me';
import LeftNavBar from '@/modules/les/components/ui/LeftNavBar';
import TopNavBar from '@/modules/les/components/ui/TopNavBar';
import { UserProvider } from '@/providers/userProvider';
import React from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getMe();
    
    return (
        <UserProvider initialUser={user as any}>
            <div className="min-h-screen w-full bg-[#F8F9FC]">
                <LeftNavBar />
                <TopNavBar />
                <main className="w-full min-h-screen pt-16 pb-20 md:pb-0 md:pt-10 md:pl-[270px]">
                    {children}
                </main>
            </div>
        </UserProvider>
    );
}