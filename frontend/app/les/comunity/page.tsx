import React from "react";
import {
    ArrowRight,
    Bell,
    Bookmark,
    ChevronRight,
    Heart,
    Image as ImageIcon,
    MessageCircle,
    MoreHorizontal,
    Plus,
    Search,
    Send,
    ShieldCheck,
    Users,
} from "lucide-react";

type Post = {
    id: number;
    author: string;
    role: string;
    time: string;
    avatar: string;
    content: string;
    likes: number;
    comments: number;
    topic: string;
    image?: string;
    verified?: boolean;
};

const posts: Post[] = [
    {
        id: 1,
        author: "Laura Martínez",
        role: "Paciente · Lupus",
        time: "Hace 25 min",
        avatar: "https://i.pravatar.cc/150?img=45",
        content:
            "¿Alguien más siente que el cansancio empeora cuando cambia el clima? Últimamente he estado teniendo mucha fatiga y me gustaría saber cómo lo manejan.",
        likes: 28,
        comments: 12,
        topic: "Lupus",
    },
    {
        id: 2,
        author: "Carlos Rodríguez",
        role: "Paciente · Bienestar",
        time: "Hace 1 h",
        avatar: "https://i.pravatar.cc/150?img=12",
        content:
            "Hoy conseguí mantener mi rutina de caminata durante toda la semana. Puede parecer algo pequeño, pero para mí es un progreso enorme. 💜",
        likes: 41,
        comments: 8,
        topic: "Progreso personal",
        image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 3,
        author: "Dra. Andrea López",
        role: "Reumatóloga",
        time: "Hace 2 h",
        avatar: "https://i.pravatar.cc/150?img=32",
        content:
            "Recordatorio para nuestra comunidad: llevar un registro de síntomas puede ayudar mucho durante una consulta. Anotar intensidad, duración y posibles desencadenantes puede aportar información muy útil.",
        likes: 63,
        comments: 14,
        topic: "Consejos médicos",
        verified: true,
    },
];

const groups = [
    {
        name: "Viviendo con Lupus",
        members: "2.4k",
        image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Nutrición y bienestar",
        members: "1.8k",
        image:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Salud mental",
        members: "1.2k",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
    },
];

const trendingTopics = [
    ["Fatiga y cansancio", 38],
    ["Alimentación antiinflamatoria", 31],
    ["Ejercicio suave", 24],
    ["Salud mental", 19],
];

function PostCard({ post }: { post: Post }) {
    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <img
                        src={post.avatar}
                        alt={post.author}
                        className="h-11 w-11 shrink-0 rounded-full object-cover ring-4 ring-purple-50"
                    />

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-bold text-gray-900">
                                {post.author}
                            </h3>

                            {post.verified && (
                                <ShieldCheck
                                    size={15}
                                    className="shrink-0 text-[#69409A]"
                                />
                            )}
                        </div>

                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                            <span>{post.role}</span>
                            <span>·</span>
                            <span>{post.time}</span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-50"
                >
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
                {post.content}
            </p>

            {post.image && (
                <div className="mt-4 overflow-hidden rounded-xl">
                    <img
                        src={post.image}
                        alt="Contenido de la publicación"
                        className="max-h-[360px] w-full object-cover"
                    />
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-[#F4EEFA] px-3 py-1 text-[10px] font-semibold text-[#69409A]">
                    #{post.topic}
                </span>

                <button
                    type="button"
                    className="text-gray-400 hover:text-[#69409A]"
                >
                    <Bookmark size={17} />
                </button>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-red-500"
                    >
                        <Heart size={17} />
                        {post.likes}
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-[#69409A]"
                    >
                        <MessageCircle size={17} />
                        {post.comments}
                    </button>
                </div>

                <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#69409A]"
                >
                    Comentar
                    <ArrowRight size={13} />
                </button>
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
                            Comunidad
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Comparte, aprende y conecta con personas que
                            entienden lo que estás viviendo.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] active:scale-95"
                    >
                        <Plus size={17} />
                        Crear publicación
                    </button>
                </div>

                {/* Search */}
                <div className="mt-6 flex h-11 w-full max-w-[700px] items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-[#69409A] focus-within:ring-2 focus-within:ring-[#69409A]/10">
                    <Search
                        size={18}
                        className="shrink-0 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar publicaciones, temas o grupos..."
                        className="ml-3 h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                    {/* MAIN */}
                    <section className="min-w-0">
                        {/* Composer */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#EDE1F5]" />

                                <button
                                    type="button"
                                    className="flex h-10 flex-1 items-center rounded-full bg-[#F7F7FA] px-4 text-left text-xs text-gray-400 transition hover:bg-[#F1EDF5]"
                                >
                                    Comparte algo con la comunidad...
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <ImageIcon
                                            size={16}
                                            className="text-[#69409A]"
                                        />
                                        Imagen
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <Users
                                            size={16}
                                            className="text-[#69409A]"
                                        />
                                        Grupo
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="rounded-lg bg-[#69409A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#583383]"
                                >
                                    Publicar
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-6 flex gap-6 overflow-x-auto border-b border-gray-200">
                            {[
                                "Para ti",
                                "Siguiendo",
                                "Más populares",
                                "Preguntas",
                            ].map((tab, index) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`relative whitespace-nowrap pb-3 text-sm font-medium ${
                                        index === 0
                                            ? "text-[#69409A]"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`}
                                >
                                    {tab}

                                    {index === 0 && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#69409A]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Posts */}
                        <div className="mt-5 space-y-4">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Community CTA */}
                        <div className="mt-6 rounded-2xl bg-[#EDE1F5] p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Users
                                            size={20}
                                            className="text-[#69409A]"
                                        />

                                        <h2 className="text-sm font-bold text-[#69409A]">
                                            Tu comunidad puede ayudarte
                                        </h2>
                                    </div>

                                    <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500">
                                        Pregunta, comparte tu experiencia o
                                        encuentra personas con intereses y
                                        experiencias similares a las tuyas.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#69409A] px-5 py-2.5 text-xs font-semibold text-white"
                                >
                                    Explorar grupos
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* SIDEBAR */}
                    <aside className="space-y-5">
                        {/* Groups */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Grupos recomendados
                                </h2>

                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todos
                                </button>
                            </div>

                            <div className="mt-4 space-y-4">
                                {groups.map((group) => (
                                    <div
                                        key={group.name}
                                        className="flex items-center gap-3"
                                    >
                                        <img
                                            src={group.image}
                                            alt={group.name}
                                            className="h-11 w-11 rounded-xl object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-xs font-semibold text-gray-900">
                                                {group.name}
                                            </h3>

                                            <p className="mt-1 text-[10px] text-gray-400">
                                                {group.members} miembros
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="rounded-lg border border-[#69409A] px-2.5 py-1.5 text-[10px] font-semibold text-[#69409A] hover:bg-[#F4EEFA]"
                                        >
                                            Unirme
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trending */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Temas populares
                                </h2>

                                <span className="text-[10px] font-medium text-gray-400">
                                    Esta semana
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {trendingTopics.map(([topic, count], index) => (
                                    <button
                                        key={topic}
                                        type="button"
                                        className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-[#F8F5FC]"
                                    >
                                        <span className="text-xs font-bold text-gray-300">
                                            0{index + 1}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium text-gray-700">
                                                #{topic}
                                            </p>

                                            <p className="mt-1 text-[10px] text-gray-400">
                                                {count} publicaciones
                                            </p>
                                        </div>

                                        <ChevronRight
                                            size={15}
                                            className="text-gray-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* My activity */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Mi actividad
                            </h2>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        12
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Publicaciones
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        47
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Comentarios
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        8
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Grupos
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        126
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Reacciones
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Safety */}
                        <div className="rounded-2xl bg-[#F3EBFA] p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#69409A]">
                                    <ShieldCheck size={19} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        Comunidad segura
                                    </h2>

                                    <p className="mt-2 text-[11px] leading-5 text-gray-500">
                                        Recuerda que las experiencias de otros
                                        usuarios no sustituyen la valoración
                                        de un profesional de la salud.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Normas de la comunidad
                                <ArrowRight size={13} />
                            </button>
                        </div>

                        {/* Notifications */}
                        <button
                            type="button"
                            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                    <Bell size={18} />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-900">
                                        Notificaciones
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-400">
                                        3 nuevas interacciones
                                    </p>
                                </div>
                            </div>

                            <ChevronRight
                                size={16}
                                className="text-gray-400"
                            />
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}