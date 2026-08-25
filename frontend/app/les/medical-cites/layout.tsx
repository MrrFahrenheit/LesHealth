import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Citas Médicas',
    description: 'Gestiona tus citas médicas y agenda nuevas consultas en LesHealth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

