import {
    ArrowRight,
    CalendarDays,
    ChevronDown,
    Clock3,
    FilterIcon,
    Heart,
    MapPin,
    Search,
    ShieldCheck,
    Star,
    UsersRound,
    Video,
} from "lucide-react";
import React from "react";

type Specialist = {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    experience: number;
    location: string;
    modality: "Presencial" | "Virtual";
    availability: string;
    image: string;
    featured?: boolean;
};

const specialists: Specialist[] = [
    {
        id: 1,
        name: "Dra. María González",
        specialty: "Reumatología",
        rating: 4.9,
        reviews: 128,
        experience: 12,
        location: "Managua",
        modality: "Presencial",
        availability: "Disponible esta semana",
        image: "https://i.pravatar.cc/150?img=47",
        featured: true,
    },
    {
        id: 2,
        name: "Dr. Carlos Méndez",
        specialty: "Cardiología",
        rating: 4.8,
        reviews: 96,
        experience: 10,
        location: "Managua",
        modality: "Presencial",
        availability: "Disponible mañana",
        image: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 3,
        name: "Lic. Andrea Ruiz",
        specialty: "Nutrición",
        rating: 4.9,
        reviews: 83,
        experience: 8,
        location: "En línea",
        modality: "Virtual",
        availability: "Disponible hoy",
        image: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: 4,
        name: "Dr. Javier Palacios",
        specialty: "Salud Mental",
        rating: 4.7,
        reviews: 75,
        experience: 9,
        location: "En línea",
        modality: "Virtual",
        availability: "Disponible esta semana",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 5,
        name: "Dra. Sofía Herrera",
        specialty: "Dermatología",
        rating: 4.8,
        reviews: 64,
        experience: 7,
        location: "Managua",
        modality: "Presencial",
        availability: "Disponible mañana",
        image: "https://i.pravatar.cc/150?img=44",
    },
    {
        id: 6,
        name: "Dr. Luis Fernández",
        specialty: "Endocrinología",
        rating: 4.7,
        reviews: 58,
        experience: 11,
        location: "Managua",
        modality: "Presencial",
        availability: "Disponible esta semana",
        image: "https://i.pravatar.cc/150?img=68",
    },
];

const categories = [
    {
        name: "Todos",
        icon: UsersRound,
    },
    {
        name: "Reumatología",
        icon: ShieldCheck,
    },
    {
        name: "Cardiología",
        icon: Heart,
    },
    {
        name: "Nutrición",
        icon: "🍎",
    },
    {
        name: "Salud Mental",
        icon: "🧠",
    },
    {
        name: "Dermatología",
        icon: "🩺",
    },
];

const categorySummary = [
    {
        name: "Reumatología",
        count: 8,
    },
    {
        name: "Cardiología",
        count: 6,
    },
    {
        name: "Nutrición",
        count: 4,
    },
    {
        name: "Salud Mental",
        count: 5,
    },
];

function SpecialistCard({
    specialist,
}: {
    specialist: Specialist;
}) {
    return (
        <article className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <img
                            src={specialist.image}
                            alt={specialist.name}
                            className="h-16 w-16 rounded-full object-cover ring-4 ring-purple-50"
                        />

                        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-900">
                            {specialist.name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-[#69409A]">
                            {specialist.specialty}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-full p-2 text-gray-400 transition hover:bg-purple-50 hover:text-[#69409A]"
                    aria-label={`Agregar a favoritos a ${specialist.name}`}
                >
                    <Heart size={18} />
                </button>
            </div>

            <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold text-gray-800">
                        {specialist.rating}
                    </span>

                    <span>
                        ({specialist.reviews} reseñas)
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <UsersRound size={16} className="text-[#69409A]" />

                    <span>
                        {specialist.experience} años de experiencia
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    {specialist.modality === "Virtual" ? (
                        <Video size={16} className="text-[#69409A]" />
                    ) : (
                        <MapPin size={16} className="text-[#69409A]" />
                    )}

                    <span>
                        {specialist.modality} · {specialist.location}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <Clock3 size={16} />

                    <span>{specialist.availability}</span>
                </div>
            </div>

            <button
                type="button"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#F4EEFA] px-4 py-2.5 text-sm font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white active:scale-[0.98]"
            >
                Ver perfil
            </button>
        </article>
    );
}

export default function Page() {
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
                                <Search
                                    size={19}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    type="text"
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
                            {categories.map((category, index) => {
                                const Icon =
                                    typeof category.icon === "string"
                                        ? null
                                        : category.icon;

                                return (
                                    <button
                                        key={category.name}
                                        type="button"
                                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                            index === 0
                                                ? "bg-[#69409A] text-white shadow-sm"
                                                : "border border-gray-200 bg-white text-gray-600 hover:border-[#69409A] hover:text-[#69409A]"
                                        }`}
                                    >
                                        {Icon ? (
                                            <Icon size={15} />
                                        ) : (
                                            <span>{category.icon}</span>
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
                                    24
                                </span>{" "}
                                especialistas disponibles
                            </p>

                            <button
                                type="button"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600"
                            >
                                Ordenar por:
                                <span className="font-semibold text-gray-900">
                                    Más recomendados
                                </span>

                                <ChevronDown size={16} />
                            </button>
                        </div>

                        {/* Specialists grid */}
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                            {specialists.map((specialist) => (
                                <SpecialistCard
                                    key={specialist.id}
                                    specialist={specialist}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400"
                            >
                                ←
                            </button>

                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
                                        page === 1
                                            ? "bg-[#69409A] text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:border-[#69409A] hover:text-[#69409A]"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <span className="px-1 text-gray-400">...</span>

                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
                            >
                                5
                            </button>

                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
                            >
                                →
                            </button>
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
                                        Cuéntanos tus síntomas y te
                                        recomendaremos al especialista ideal.
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
                                    <ShieldCheck
                                        size={35}
                                        className="text-[#69409A]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured specialist */}
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
                                    src={specialists[0].image}
                                    alt={specialists[0].name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        {specialists[0].name}
                                    </h3>

                                    <p className="mt-1 text-xs text-[#69409A]">
                                        {specialists[0].specialty}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                <Star
                                    size={14}
                                    className="fill-yellow-400 text-yellow-400"
                                />

                                <span className="font-semibold text-gray-800">
                                    {specialists[0].rating}
                                </span>

                                <span>
                                    ({specialists[0].reviews} reseñas)
                                </span>
                            </div>

                            <p className="mt-3 text-xs leading-5 text-gray-500">
                                Especialista en enfermedades autoinmunes y
                                manejo integral.
                            </p>

                            <button
                                type="button"
                                className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#F4EEFA] py-2.5 text-sm font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white"
                            >
                                Ver perfil
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Explorar por categoría
                                </h2>

                                <ArrowRight
                                    size={16}
                                    className="text-[#69409A]"
                                />
                            </div>

                            <div className="mt-4 space-y-3">
                                {categorySummary.map((category) => (
                                    <button
                                        type="button"
                                        key={category.name}
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