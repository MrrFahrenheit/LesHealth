"use client";

import { EmptyState } from '@/components/ui/EmptyState';
import { Loader } from '@/components/ui/Loader';
import { Doctor, getDoctors } from '@/modules/les/api/specialists.api';
import { SpecialistCard } from '@/modules/les/specialists/SpecialistCard';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowRight,
    ChevronDown,
    Clock3,
    FilterIcon,
    Heart,
    MapPin,
    Search,
    ShieldCheck,
    Star,
    UsersRound,
    Video
} from "lucide-react";
import Link from 'next/link';
import { useMemo, useState } from "react";

const CATEGORIES = [
    { name: "Todos", icon: UsersRound },
    { name: "Reumatología", icon: ShieldCheck },
    { name: "Cardiología", icon: Heart },
    { name: "Nutrición", icon: "🍎" },
    { name: "Salud Mental", icon: "🧠" },
    { name: "Dermatología", icon: "🩺" },
];


export default function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const { data: doctors, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors,
    });

    const filteredDoctors = useMemo(() => {
        if (!doctors) return [];
        
        return doctors.filter(doc => {
            const profile = doc.les_doctor_profile;
            const name = (profile?.name || doc.full_name).toLowerCase();
            const spec = (profile?.specialty || "").toLowerCase();
            const searchLower = searchQuery.toLowerCase();
            
            // Filtro por texto
            const matchesSearch = name.includes(searchLower) || spec.includes(searchLower);
            
            // Filtro por categoría
            const matchesCategory = selectedCategory === "Todos" || spec.includes(selectedCategory.toLowerCase());

            return matchesSearch && matchesCategory;
        });
    }, [doctors, searchQuery, selectedCategory]);

    const featuredDoctor = useMemo(() => {
        if (!doctors) return null;
        return doctors.find(doc => doc.les_doctor_profile?.is_featured) || doctors[0];
    }, [doctors]);

    // Resumen dinámico de categorías
    const categorySummary = useMemo(() => {
        if (!doctors) return [];
        const counts: Record<string, number> = {};
        doctors.forEach(doc => {
            const spec = doc.les_doctor_profile?.specialty || 'General';
            counts[spec] = (counts[spec] || 0) + 1;
        });
        
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 4); // Mostrar top 4
    }, [doctors]);

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Especialistas
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Encuentra el especialista adecuado para tu bienestar.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                    {/* MAIN CONTENT */}
                    <section className="min-w-0">
                        {/* Search */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="flex h-11 min-w-0 flex-1 items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-[#69409A] focus-within:ring-2 focus-within:ring-[#69409A]/10">
                                <Search size={19} className="shrink-0 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar por nombre, especialidad o síntoma..."
                                    className="ml-3 h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>

                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#69409A] bg-white px-5 text-sm font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white"
                            >
                                <FilterIcon size={17} />
                                Filtros
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                            {CATEGORIES.map((category) => {
                                const IconComponent = typeof category.icon === "string" ? null : category.icon;
                                const isSelected = selectedCategory === category.name;

                                return (
                                    <button
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name)}
                                        type="button"
                                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                            isSelected
                                                ? "bg-[#69409A] text-white shadow-sm"
                                                : "border border-gray-200 bg-white text-gray-600 hover:border-[#69409A] hover:text-[#69409A]"
                                        }`}
                                    >
                                        {IconComponent ? (
                                            <IconComponent size={15} />
                                        ) : (
                                            <span>{category.icon as string}</span>
                                        )}
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Results header */}
                        <div className="mt-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-800">
                                    {filteredDoctors.length}
                                </span>{" "}
                                especialistas disponibles
                            </p>

                            <button
                                type="button"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600"
                            >
                                Ordenar por:
                                <span className="font-semibold text-gray-900">Más recomendados</span>
                                <ChevronDown size={16} />
                            </button>
                        </div>

                        {/* Specialists grid */}
                        <div className="mt-4">
                            {isLoading ? (
                                <Loader text="Buscando especialistas..." />
                            ) : filteredDoctors.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                                    {filteredDoctors.map((specialist) => (
                                        <SpecialistCard
                                            key={specialist.id}
                                            specialist={specialist}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState 
                                    title="No se encontraron especialistas" 
                                    description="No hay doctores que coincidan con tu búsqueda o filtros." 
                                />
                            )}
                        </div>
                    </section>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-5">
                        {/* Recommendation */}
                        <div className="overflow-hidden rounded-2xl bg-[#EDE1F5] p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        ¿No estás seguro a quién consultar?
                                    </h2>
                                    <p className="mt-2 text-sm leading-5 text-gray-600">
                                        Cuéntanos tus síntomas y te recomendaremos al especialista ideal.
                                    </p>
                                    <button
                                        type="button"
                                        className="mt-4 flex items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383] active:scale-95"
                                    >
                                        Obtener recomendación
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                                <div className="hidden rounded-full bg-white/70 p-3 sm:flex">
                                    <ShieldCheck size={35} className="text-[#69409A]" />
                                </div>
                            </div>
                        </div>

                        {/* Featured specialist */}
                        {featuredDoctor && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        Especialista destacado
                                    </h2>
                                    <span className="rounded-md bg-[#69409A] px-2 py-1 text-[10px] font-bold text-white">
                                        TOP
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center gap-3">
                                    <img
                                        src={featuredDoctor.les_doctor_profile?.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredDoctor.full_name)}`}
                                        alt={featuredDoctor.full_name}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                                            {featuredDoctor.les_doctor_profile?.name || featuredDoctor.full_name}
                                        </h3>
                                        <p className="mt-1 text-xs text-[#69409A]">
                                            {featuredDoctor.les_doctor_profile?.specialty || 'General'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-gray-800">
                                        {featuredDoctor.les_doctor_profile?.rating || '0.0'}
                                    </span>
                                    <span>
                                        ({featuredDoctor.les_doctor_profile?.reviews_count || 0} reseñas)
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#F4EEFA] py-2.5 text-sm font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white"
                                >
                                    Ver perfil
                                </button>
                            </div>
                        )}

                        {/* Categories */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Explorar por categoría
                                </h2>
                                <ArrowRight size={16} className="text-[#69409A]" />
                            </div>

                            <div className="mt-4 space-y-3">
                                {categorySummary.map((category) => (
                                    <button
                                        type="button"
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name)}
                                        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#F8F5FC]"
                                    >
                                        <span className="text-sm text-gray-600">
                                            {category.name}
                                        </span>
                                        <span className="text-xs font-semibold text-[#69409A]">
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#69409A]"
                            >
                                Ver todas las categorías
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}