import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Autenticación',
    description: 'Inicia sesión o regístrate en LesHealth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

