import React from "react";
import {
    ArrowRight,
    BookOpen,
    Brain,
    ChevronRight,
    Clock3,
    Dumbbell,
    Heart,
    Lightbulb,
    Moon,
    Play,
    Search,
    ShieldCheck,
    Utensils,
    Folder
} from "lucide-react";

type ContentCardProps = {
    type: string;
    title: string;
    description: string;
    duration: string;
    image: string;
};

const categoryStyles: Record<string, any> = {
    "Enfermedades autoinmunes": {
        icon: ShieldCheck,
        bg: "bg-purple-50",
        color: "text-[#69409A]",
    },
    "Corazón y vascular": {
        icon: Heart,
        bg: "bg-red-50",
        color: "text-red-500",
    },
    "Nutrición y alimentación": {
        icon: Utensils,
        bg: "bg-emerald-50",
        color: "text-emerald-500",
    },
    "Ejercicio y bienestar": {
        icon: Dumbbell,
        bg: "bg-blue-50",
        color: "text-blue-500",
    },
    "Salud mental": {
        icon: Brain,
        bg: "bg-indigo-50",
        color: "text-indigo-500",
    },
    "Sueño y descanso": {
        icon: Moon,
        bg: "bg-purple-50",
        color: "text-purple-500",
    },
};

import Link from "next/link";
import CourseGrid from "./components/CourseGrid";

function ContentCard({
    id,
    type,
    title,
    description,
    duration,
    image,
}: ContentCardProps & { id: string }) {
    return (
        <Link href={`/les/education/${id}`} className="block">
            <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                    <img
                        src={image || "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-lg bg-[#69409A] px-2.5 py-1 text-[10px] font-bold text-white">
                        {type}
                    </span>
                </div>

                <div className="p-4">
                    <h3 className="text-sm font-bold leading-5 text-gray-900">
                        {title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                        {description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <Clock3 size={14} />
                        {duration}
                    </div>
                </div>
            </article>
        </Link>
    );
}

async function getCategories() {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/categories`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function getCourses() {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/courses`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function Page() {
    const dbCategories = await getCategories();
    const dbCourses = await getCourses();

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1200px]">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Educación
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Aprende, comprende y toma el control de tu salud.
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="mt-6 flex h-11 w-full max-w-[700px] items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-[#69409A] focus-within:ring-2 focus-within:ring-[#69409A]/10">
                    <Search
                        size={19}
                        className="shrink-0 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar artículos, cursos, videos, temas..."
                        className="ml-3 h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                </div>

                {/* Content */}
                <div className="mt-7">
                    <section className="min-w-0">
                        {/* Hero */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#EDE2F5] p-6 md:p-8">
                            <div className="relative z-10 max-w-[520px]">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#69409A]">
                                    <Lightbulb size={14} />
                                    Aprende con LesHealth
                                </span>

                                <h2 className="mt-4 text-2xl font-bold leading-tight text-[#69409A] md:text-3xl">
                                    Conocimiento que te ayuda a cuidar mejor tu
                                    salud
                                </h2>

                                <p className="mt-3 max-w-[450px] text-sm leading-6 text-gray-600">
                                    Explora contenido confiable y actualizado
                                    sobre enfermedades, nutrición, ejercicio,
                                    salud mental y mucho más.
                                </p>
                            </div>

                            <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] md:block">
                                <div className="absolute right-16 top-12 flex h-28 w-28 items-center justify-center rounded-full bg-white/70">
                                    <BookOpen
                                        size={50}
                                        className="text-[#69409A]"
                                    />
                                </div>

                                <div className="absolute bottom-0 right-12 text-[150px] leading-none opacity-10">
                                    <BookOpen size={150} />
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                                <span className="h-2 w-5 rounded-full bg-[#69409A]" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mt-7">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Explora por categoría
                                </h2>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                                {dbCategories.map((category: any) => {
                                    const style = categoryStyles[category.name] || {
                                        icon: Folder,
                                        bg: "bg-gray-50",
                                        color: "text-gray-500",
                                    };
                                    const Icon = style.icon;

                                    return (
                                        <button
                                            key={category.id}
                                            type="button"
                                            className="rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                        >
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bg} ${style.color}`}
                                            >
                                                <Icon size={20} />
                                            </div>

                                            <h3 className="mt-3 text-xs font-semibold leading-4 text-gray-900">
                                                {category.name}
                                            </h3>

                                            <p className="mt-1 text-[10px] text-gray-400">
                                                {category.description || "Ver categoría"}
                                            </p>
                                        </button>
                                    );
                                })}
                                {dbCategories.length === 0 && (
                                    <p className="text-sm text-gray-500">No hay categorías disponibles.</p>
                                )}
                            </div>
                        </div>

                        {/* Featured (Now mapped from courses) */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Cursos Destacados
                                </h2>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {dbCourses.slice(0, 3).map((course: any) => (
                                    <ContentCard
                                        key={course.id}
                                        id={course.id}
                                        type="Curso"
                                        title={course.title}
                                        description={course.description || "Conoce más sobre este tema."}
                                        duration="A tu ritmo"
                                        image={course.image_url || "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"}
                                    />
                                ))}
                                {dbCourses.length === 0 && (
                                    <p className="text-sm text-gray-500">No hay contenido destacado.</p>
                                )}
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Todos los cursos
                                </h2>
                            </div>

                            <CourseGrid courses={dbCourses} />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}