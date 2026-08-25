import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Mis Prescripciones',
    description: 'Revisa y gestiona tus recetas y prescripciones médicas en LesHealth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

