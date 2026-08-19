"use client";

import AggendCite from '@/modules/les/components/navigation/AggendCite';
import ArticleCard from '@/modules/les/components/ui/ArticleCard';
import HealthStatItem from '@/modules/les/components/ui/HealthStatItem';
import QuickActionCard from '@/modules/les/components/ui/QuickActionCard';
import SpecialistCard from '@/modules/les/components/ui/SpecialistCard';
import { useUser } from '@/providers/userProvider'
import {
    Calendar, ArrowRight, Activity, Moon, Heart,
    MapPin, Clock, Star, FileText, MessageCircle, ChevronRight
} from 'lucide-react'; import React from 'react'

export default function page() {

    const lesUser = useUser();
    
    return (
        <div className="flex-1 overflow-y-auto bg-[#F8F9FC] p-6 lg:p-8">
            {/* Contenedor Grid Principal: 2 columnas en izquierda, 1 en derecha (en pantallas grandes) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

                {/* ============================== */}
                {/* COLUMNA IZQUIERDA (Principal) */}
                {/* ============================== */}
                <div className="xl:col-span-2 flex flex-col gap-8">

                    {/* 1. Hero Section */}
                    <AggendCite />

                    {/* 2. Acciones Rápidas */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <QuickActionCard
                                icon={<Calendar className="text-purple-600 w-6 h-6" />}
                                title="Agendar cita"
                                subtitle="Reserva con especialistas"
                                bgColor="bg-purple-100/50"
                            />
                            <QuickActionCard
                                icon={<FileText className="text-blue-600 w-6 h-6" />}
                                title="Consultar resultados"
                                subtitle="Revisa tus análisis"
                                bgColor="bg-blue-100/50"
                            />
                            <QuickActionCard
                                icon={<Activity className="text-green-600 w-6 h-6" />}
                                title="Mis prescripciones"
                                subtitle="Gestiona tus medicamentos"
                                bgColor="bg-green-100/50"
                            />
                            <QuickActionCard
                                icon={<MessageCircle className="text-yellow-600 w-6 h-6" />}
                                title="Chat con especialista"
                                subtitle="Consulta en línea"
                                bgColor="bg-yellow-100/50"
                            />
                        </div>
                    </section>

                    {/* 3. Próximas Citas */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Próximas citas</h2>
                            <button className="text-[#5C328E] text-sm font-semibold flex items-center gap-1 hover:underline">
                                Ver todas <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* Cita Card */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition">
                                <div className="flex items-center gap-4">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Dr" className="w-16 h-16 rounded-xl object-cover bg-blue-50" />
                                    <div>
                                        <span className="text-[#5C328E] text-xs font-bold uppercase tracking-wider bg-purple-50 px-2 py-1 rounded-md">Cardiología</span>
                                        <h3 className="font-bold text-gray-900 mt-2">Dr. Andrés Castillo</h3>
                                        <p className="text-sm text-gray-500 mb-2">Especialista en Cardiología</p>
                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Mar, 19 Ago</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10:30 AM</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Consulta presencial</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#5C328E] group-hover:text-white transition text-gray-400">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>

                            {/* No tienes más citas */}
                            <div className="bg-gray-50/80 rounded-2xl p-5 border border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
                                <Calendar className="w-8 h-8 text-gray-400" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">No tienes más citas próximas</h4>
                                    <p className="text-sm text-gray-500">¿Por qué no agendas otra?</p>
                                </div>
                                <button className="md:ml-auto bg-white border border-[#5C328E] text-[#5C328E] px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-50 transition">
                                    Buscar especialistas
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* 4. Especialistas Recomendados */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Especialistas recomendados</h2>
                            <button className="text-[#5C328E] text-sm font-semibold flex items-center gap-1 hover:underline">
                                Ver todos <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <SpecialistCard name="Dra. Laura Méndez" specialty="Dermatóloga" rating="4.9" reviews="214" img="https://i.pravatar.cc/150?img=32" />
                            <SpecialistCard name="Dra. Marina López" specialty="Pediatra" rating="4.8" reviews="189" img="https://i.pravatar.cc/150?img=5" />
                            <SpecialistCard name="Dr. Ricardo Salazar" specialty="Nutricionista" rating="4.9" reviews="267" img="https://i.pravatar.cc/150?img=12" />
                        </div>
                    </section>

                </div>


                {/* ============================== */}
                {/* COLUMNA DERECHA (Sidebar) */}
                {/* ============================== */}
                <div className="xl:col-span-1 flex flex-col gap-6">

                    {/* Resumen de salud */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Resumen de tu salud</h2>
                            <button className="text-gray-500 text-xs font-semibold flex items-center hover:text-[#5C328E]">
                                Ver más <ArrowRight className="w-3 h-3 ml-1" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-5">
                            <HealthStatItem
                                icon={<Heart className="w-5 h-5 text-red-500" />} iconBg="bg-red-50"
                                title="Frecuencia cardíaca" value="72" unit="lpm"
                                badgeText="Normal" badgeColor="bg-green-100 text-green-700"
                            />
                            <HealthStatItem
                                icon={<Activity className="w-5 h-5 text-[#5C328E]" />} iconBg="bg-purple-50"
                                title="Presión arterial" value="120/80" unit="mmHg"
                                badgeText="Normal" badgeColor="bg-green-100 text-green-700"
                            />
                            <HealthStatItem
                                icon={<Moon className="w-5 h-5 text-blue-500" />} iconBg="bg-blue-50"
                                title="Calidad del sueño" value="7.8" unit="h"
                                badgeText="Buena" badgeColor="bg-blue-100 text-blue-700"
                            />
                        </div>
                    </div>

                    {/* Educación y bienestar */}
                    <div className="bg-transparent mt-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Educación y bienestar</h2>
                            <button className="text-gray-500 text-xs font-semibold flex items-center hover:text-[#5C328E]">
                                Ver más <ArrowRight className="w-3 h-3 ml-1" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <ArticleCard
                                img="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=150&q=80"
                                category="Nutrición"
                                title="5 hábitos para una vida más saludable"
                                time="5 min"
                            />
                            <ArticleCard
                                img="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=150&q=80"
                                category="Ejercicio"
                                title="La importancia del movimiento diario"
                                time="7 min"
                            />
                            <ArticleCard
                                img="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150&q=80"
                                category="Salud mental"
                                title="Cómo reducir el estrés en la vida diaria"
                                time="6 min"
                            />
                        </div>
                    </div>

                    {/* Banner Comunidad */}
                    <div className="bg-[#5C328E] rounded-3xl p-6 text-white relative overflow-hidden mt-2">
                        <div className="relative z-10 flex flex-col gap-3 items-start">
                            <div className="flex -space-x-2 mb-2">
                                <img className="w-8 h-8 rounded-full border-2 border-[#5C328E]" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                <img className="w-8 h-8 rounded-full border-2 border-[#5C328E]" src="https://i.pravatar.cc/100?img=2" alt="User" />
                                <img className="w-8 h-8 rounded-full border-2 border-[#5C328E]" src="https://i.pravatar.cc/100?img=3" alt="User" />
                            </div>
                            <h3 className="font-bold text-lg leading-tight">Únete a nuestra comunidad</h3>
                            <p className="text-purple-200 text-sm mb-2">
                                Comparte, aprende y crece junto a personas que cuidan su salud.
                            </p>
                            <button className="bg-white text-[#5C328E] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition">
                                Explorar comunidad <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Elemento decorativo de fondo */}
                        <div className="absolute -bottom-6 -right-4 opacity-50 pointer-events-none">
                            <Activity className="w-32 h-32 text-purple-400" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
