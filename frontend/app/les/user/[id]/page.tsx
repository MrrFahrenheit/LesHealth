"use client";

import { EmptyState } from '@/components/ui/EmptyState';
import { Loader } from '@/components/ui/Loader';
import { getUserProfile } from '@/modules/les/api/users.api';
import { useQuery } from '@tanstack/react-query';
import {
    Activity,
    ArrowRight,
    Bell,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Edit3,
    FileText,
    Heart,
    Lock,
    MapPin,
    Pill,
    Settings,
    ShieldCheck,
    Star,
    UserRound,
} from "lucide-react";
import { useParams } from 'next/navigation';

// ... existing constants ...

const recentActivity = [
    {
        title: "Cita médica completada",
        description: "Dra. María González · Reumatología",
        date: "Hoy, 10:30 AM",
        icon: CalendarDays,
        bg: "bg-purple-50",
        color: "text-[#69409A]",
    },
    {
        title: "Prescripción actualizada",
        description: "Se agregó un nuevo medicamento",
        date: "Ayer, 04:20 PM",
        icon: Pill,
        bg: "bg-blue-50",
        color: "text-blue-600",
    },
    {
        title: "Contenido educativo completado",
        description: "Entendiendo la inflamación crónica",
        date: "22 May 2025",
        icon: FileText,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
    },
];

const quickActions = [
    {
        title: "Editar perfil",
        description: "Actualiza tu información",
        icon: Edit3,
    },
    {
        title: "Mis citas",
        description: "Consulta tus próximas citas",
        icon: CalendarDays,
    },
    {
        title: "Prescripciones",
        description: "Revisa tus tratamientos",
        icon: Pill,
    },
    {
        title: "Configuración",
        description: "Preferencias y privacidad",
        icon: Settings,
    },
];

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    const { data: user, isLoading } = useQuery({
        queryKey: ['userProfile', id],
        queryFn: () => getUserProfile(id),
        enabled: !!id,
    });

    if (isLoading) {
        return <Loader text="Cargando perfil..." />;
    }

    if (!user) {
        return (
            <div className="p-8">
                <EmptyState title="Usuario no encontrado" description="No se pudo cargar la información de este usuario." />
            </div>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Perfil de Usuario
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Información y actividad detallada en LES health.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#69409A] hover:text-[#69409A]"
                    >
                        <Edit3 size={16} />
                        Editar perfil
                    </button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    {/* MAIN */}
                    <section className="min-w-0 space-y-6">
                        {/* Profile hero */}
                        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="relative h-32 bg-[#EDE1F5]">
                                <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-white/30" />
                                <div className="absolute right-24 top-8 h-20 w-20 rounded-full bg-white/20" />
                            </div>

                            <div className="px-5 pb-6 lg:px-7">
                                <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                        <div className="relative">
                                            <img
                                                src={user.les_doctor_profile?.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=random`}
                                                alt={`Perfil de ${user.full_name}`}
                                                className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md"
                                            />

                                            <button
                                                type="button"
                                                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#69409A] text-white shadow-sm"
                                                aria-label="Editar foto"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                        </div>

                                        <div className="pb-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    {user.full_name}
                                                </h2>

                                                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                                                    <CheckCircle2 size={12} />
                                                    Cuenta verificada
                                                </span>
                                            </div>

                                            <p className="mt-1 text-sm text-[#69409A] capitalize">
                                                {user.role} · {user.les_doctor_profile?.specialty || 'Miembro de LES health'}
                                            </p>

                                            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={13} />
                                                    {user.les_doctor_profile?.location || 'Managua, Nicaragua'}
                                                </span>

                                                <span>
                                                    Miembro desde enero 2025
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]"
                                    >
                                        <UserRound size={15} />
                                        Ver perfil público
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Personal information */}
                        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 lg:px-6">
                                <div>
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        Información personal
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Datos asociados a tu cuenta.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                >
                                    Editar
                                    <Edit3 size={14} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0">
                                <div className="p-5 lg:p-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                        Nombre completo
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {user.full_name}
                                    </p>
                                </div>

                                <div className="border-gray-100 p-5 sm:border-l lg:p-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                        Correo electrónico
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {user.email}
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 p-5 lg:p-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                        Fecha de nacimiento
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        No registrada
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 p-5 sm:border-l lg:p-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                        Teléfono
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        No registrado
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Health summary */}
                        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-5 py-4 lg:px-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-sm font-bold text-[#69409A]">
                                            Resumen de salud
                                        </h2>

                                        <p className="mt-1 text-xs text-gray-400">
                                            Información general de tu actividad
                                            reciente.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                    >
                                        Ver historial
                                        <ArrowRight size={13} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 divide-gray-100 sm:grid-cols-4 sm:divide-x">
                                <div className="p-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                        <Activity size={19} />
                                    </div>

                                    <p className="mt-3 text-xs text-gray-400">
                                        Seguimiento
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        12
                                    </p>

                                    <p className="mt-1 text-[10px] text-emerald-600">
                                        registros este mes
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 p-5 sm:border-t-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <Heart size={19} />
                                    </div>

                                    <p className="mt-3 text-xs text-gray-400">
                                        Citas
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        3
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-400">
                                        próximas
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 p-5 sm:border-t-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Pill size={19} />
                                    </div>

                                    <p className="mt-3 text-xs text-gray-400">
                                        Tratamientos
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        4
                                    </p>

                                    <p className="mt-1 text-[10px] text-emerald-600">
                                        activos
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 p-5 sm:border-t-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Star size={19} />
                                    </div>

                                    <p className="mt-3 text-xs text-gray-400">
                                        Educación
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        65%
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-400">
                                        progreso
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Recent activity */}
                        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 lg:px-6">
                                <div>
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        Actividad reciente
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Tus últimas acciones en LES health.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todo
                                </button>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {recentActivity.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="flex items-center gap-4 px-5 py-4 lg:px-6"
                                        >
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                                            >
                                                <Icon size={18} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <span className="shrink-0 text-[10px] text-gray-400">
                                                {item.date}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </section>

                    {/* SIDEBAR */}
                    <aside className="space-y-5">
                        {/* Profile completion */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Perfil
                                </h2>

                                <span className="text-sm font-bold text-[#69409A]">
                                    80%
                                </span>
                            </div>

                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-[#69409A]"
                                    style={{ width: "80%" }}
                                />
                            </div>

                            <p className="mt-3 text-xs leading-5 text-gray-500">
                                Completa tu perfil para aprovechar mejor las
                                funciones de LES health.
                            </p>

                            <button
                                type="button"
                                className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Completar perfil
                                <ArrowRight size={14} />
                            </button>
                        </section>

                        {/* Quick actions */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Accesos rápidos
                            </h2>

                            <div className="mt-4 space-y-2">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;

                                    return (
                                        <button
                                            type="button"
                                            key={action.title}
                                            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#F8F5FC]"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-[#69409A]">
                                                <Icon size={17} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-gray-900">
                                                    {action.title}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-gray-400">
                                                    {action.description}
                                                </p>
                                            </div>

                                            <ChevronRight
                                                size={15}
                                                className="text-gray-300"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Verification */}
                        <section className="rounded-2xl bg-[#EDE1F5] p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#69409A] shadow-sm">
                                    <ShieldCheck size={21} />
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold text-[#69409A]">
                                        PROFESIONALES DE LA SALUD
                                    </span>

                                    <h2 className="mt-1 text-sm font-bold text-[#69409A]">
                                        ¿Eres especialista?
                                    </h2>

                                    <p className="mt-2 text-xs leading-5 text-gray-600">
                                        Verifica tus credenciales y obtén tu
                                        insignia de especialista verificado.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]"
                            >
                                Verificarme
                                <ArrowRight size={14} />
                            </button>
                        </section>

                        {/* Privacy */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Lock size={18} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Tu información está protegida
                                    </h2>

                                    <p className="mt-2 text-[11px] leading-5 text-gray-500">
                                        Puedes administrar la privacidad y los
                                        permisos de tus datos desde
                                        configuración.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Revisar privacidad
                                <ChevronRight size={14} />
                            </button>
                        </section>

                        {/* Notifications */}
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-[#69409A]"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                <Bell size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-gray-900">
                                    Notificaciones
                                </p>

                                <p className="mt-1 text-[10px] text-gray-400">
                                    Revisa tus recordatorios y novedades.
                                </p>
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