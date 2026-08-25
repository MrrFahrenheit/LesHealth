import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Especialistas',
    description: 'Encuentra y conoce a los especialistas de salud disponibles en LesHealth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

