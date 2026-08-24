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
} from "lucide-react";

type ContentCardProps = {
    type: "Artículo" | "Video" | "Infografía";
    title: string;
    description: string;
    duration: string;
    image: string;
};

const categories = [
    {
        name: "Enfermedades autoinmunes",
        count: 12,
        icon: ShieldCheck,
        bg: "bg-purple-50",
        color: "text-[#69409A]",
    },
    {
        name: "Corazón y vascular",
        count: 18,
        icon: Heart,
        bg: "bg-red-50",
        color: "text-red-500",
    },
    {
        name: "Nutrición y alimentación",
        count: 24,
        icon: Utensils,
        bg: "bg-emerald-50",
        color: "text-emerald-500",
    },
    {
        name: "Ejercicio y bienestar",
        count: 16,
        icon: Dumbbell,
        bg: "bg-blue-50",
        color: "text-blue-500",
    },
    {
        name: "Salud mental",
        count: 14,
        icon: Brain,
        bg: "bg-indigo-50",
        color: "text-indigo-500",
    },
    {
        name: "Sueño y descanso",
        count: 10,
        icon: Moon,
        bg: "bg-purple-50",
        color: "text-purple-500",
    },
];

const featuredContent: ContentCardProps[] = [
    {
        type: "Artículo",
        title: "¿Qué es el Lupus? Conoce los síntomas y cómo manejarlo",
        description:
            "Aprende sobre esta enfermedad autoinmune, sus síntomas y el manejo diario.",
        duration: "8 min de lectura",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
    },
    {
        type: "Video",
        title: "Alimentación antiinflamatoria: guía práctica",
        description:
            "Descubre qué alimentos pueden ayudarte a reducir la inflamación.",
        duration: "12 min",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
    {
        type: "Infografía",
        title: "Higiene del sueño: pequeños cambios, grandes resultados",
        description:
            "Consejos sencillos para mejorar la calidad de tu sueño cada noche.",
        duration: "5 min de lectura",
        image: "https://images.unsplash.com/photo-1455642305367-68834a2d4a32?auto=format&fit=crop&w=800&q=80",
    },
];

const learning = [
    {
        title: "Entendiendo la inflamación crónica",
        type: "Video",
        duration: "10 min",
        progress: 70,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Meditación guiada para principiantes",
        type: "Audio",
        duration: "15 min",
        progress: 40,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Guía de medicamentos",
        type: "Artículo",
        duration: "6 min",
        progress: 20,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
    },
];

const courses = [
    {
        title: "Viviendo con Lupus",
        modules: "5 módulos",
        progress: 60,
        icon: ShieldCheck,
    },
    {
        title: "Salud del corazón",
        modules: "4 módulos",
        progress: 30,
        icon: Heart,
    },
    {
        title: "Nutrición y bienestar",
        modules: "6 módulos",
        progress: 75,
        icon: Utensils,
    },
    {
        title: "Manejo del estrés",
        modules: "5 módulos",
        progress: 40,
        icon: Brain,
    },
];

function ContentCard({
    type,
    title,
    description,
    duration,
    image,
}: ContentCardProps) {
    return (
        <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-44 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-lg bg-[#69409A] px-2.5 py-1 text-[10px] font-bold text-white">
                    {type}
                </span>

                {type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#69409A] shadow-md">
                            <Play size={18} fill="currentColor" />
                        </div>
                    </div>
                )}
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
    );
}

export default function Page() {
    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
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
                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                    {/* MAIN */}
                    <section className="min-w-0">
                        {/* Hero */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#EDE2F5] p-6 md:p-8">
                            <div className="relative z-10 max-w-[520px]">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#69409A]">
                                    <Lightbulb size={14} />
                                    Contenido recomendado para ti
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

                                <button
                                    type="button"
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#69409A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#583383]"
                                >
                                    Explorar contenido
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] md:block">
                                <div className="absolute right-16 top-12 flex h-28 w-28 items-center justify-center rounded-full bg-white/70">
                                    <BookOpen
                                        size={50}
                                        className="text-[#69409A]"
                                    />
                                </div>

                                <div className="absolute bottom-0 right-12 text-[150px] leading-none opacity-10">
                                    📚
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                                <span className="h-2 w-5 rounded-full bg-[#69409A]" />
                                <span className="h-2 w-2 rounded-full bg-[#CAB1D8]" />
                                <span className="h-2 w-2 rounded-full bg-[#CAB1D8]" />
                                <span className="h-2 w-2 rounded-full bg-[#CAB1D8]" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mt-7">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Explora por categoría
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todas
                                    <ArrowRight size={14} />
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                                {categories.map((category) => {
                                    const Icon = category.icon;

                                    return (
                                        <button
                                            key={category.name}
                                            type="button"
                                            className="rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                        >
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${category.bg} ${category.color}`}
                                            >
                                                <Icon size={20} />
                                            </div>

                                            <h3 className="mt-3 text-xs font-semibold leading-4 text-gray-900">
                                                {category.name}
                                            </h3>

                                            <p className="mt-1 text-[10px] text-gray-400">
                                                {category.count} artículos
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Featured */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Contenido destacado
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todo
                                    <ArrowRight size={14} />
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {featuredContent.map((content) => (
                                    <ContentCard
                                        key={content.title}
                                        {...content}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Cursos recomendados para ti
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todos los cursos
                                    <ArrowRight size={14} />
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {courses.map((course) => {
                                    const Icon = course.icon;

                                    return (
                                        <article
                                            key={course.title}
                                            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                                    <Icon size={19} />
                                                </div>

                                                <div>
                                                    <span className="text-[10px] font-semibold text-[#69409A]">
                                                        Curso
                                                    </span>

                                                    <h3 className="text-sm font-bold text-gray-900">
                                                        {course.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <p className="mt-3 text-xs text-gray-400">
                                                {course.modules}
                                            </p>

                                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-[#69409A]"
                                                    style={{
                                                        width: `${course.progress}%`,
                                                    }}
                                                />
                                            </div>

                                            <div className="mt-2 text-right text-[10px] font-semibold text-[#69409A]">
                                                {course.progress}%
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-5">
                        {/* Progress */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Tu progreso
                            </h2>

                            <div className="mt-5 flex items-center gap-4">
                                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                                    <svg
                                        className="-rotate-90"
                                        width="96"
                                        height="96"
                                        viewBox="0 0 96 96"
                                    >
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="35"
                                            fill="none"
                                            stroke="#EEE8F4"
                                            strokeWidth="8"
                                        />

                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="35"
                                            fill="none"
                                            stroke="#69409A"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray="220"
                                            strokeDashoffset="77"
                                        />
                                    </svg>

                                    <span className="absolute text-xl font-bold text-[#69409A]">
                                        65%
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        ¡Sigue aprendiendo!
                                    </p>

                                    <p className="mt-2 text-xs leading-5 text-gray-500">
                                        Has completado 13 de 20 contenidos
                                        recomendados.
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-3 rounded-lg bg-[#69409A] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#583383]"
                                    >
                                        Ver mi progreso
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Continue learning */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Continúa aprendiendo
                                </h2>

                                <ChevronRight
                                    size={16}
                                    className="text-[#69409A]"
                                />
                            </div>

                            <div className="mt-4 space-y-4">
                                {learning.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex gap-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-16 w-20 shrink-0 rounded-xl object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold leading-4 text-gray-900">
                                                {item.title}
                                            </p>

                                            <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
                                                {item.type}
                                                <span>·</span>
                                                {item.duration}
                                            </div>

                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                                                    <div
                                                        className="h-full rounded-full bg-[#69409A]"
                                                        style={{
                                                            width: `${item.progress}%`,
                                                        }}
                                                    />
                                                </div>

                                                <span className="text-[10px] font-semibold text-[#69409A]">
                                                    {item.progress}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Ver todo mi aprendizaje
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Popular topics */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Temas populares
                                </h2>
                            </div>

                            <div className="mt-4 space-y-3">
                                {[
                                    ["Manejo del dolor", 24],
                                    ["Fatiga crónica", 18],
                                    ["Salud ósea", 14],
                                ].map(([title, count]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#F8F5FC]"
                                    >
                                        <span className="text-xs text-gray-600">
                                            {title}
                                        </span>

                                        <span className="text-[10px] font-semibold text-[#69409A]">
                                            {count} contenidos
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Ver todos los temas
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Resources */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Recursos útiles
                            </h2>

                            <div className="mt-4 space-y-2">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between rounded-xl p-2 text-xs text-gray-600 transition hover:bg-[#F8F5FC]"
                                >
                                    <span>Guías y folletos descargables</span>
                                    <ChevronRight
                                        size={15}
                                        className="text-gray-400"
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between rounded-xl p-2 text-xs text-gray-600 transition hover:bg-[#F8F5FC]"
                                >
                                    <span>Herramientas y calculadoras</span>
                                    <ChevronRight
                                        size={15}
                                        className="text-gray-400"
                                    />
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}