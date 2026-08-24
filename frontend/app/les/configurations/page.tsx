import React from "react";
import {
    ArrowRight,
    Bell,
    ChevronRight,
    CircleHelp,
    Eye,
    FileCheck2,
    Globe,
    Lock,
    LogOut,
    Moon,
    Palette,
    ShieldCheck,
    Smartphone,
    User,
    UserRoundCheck,
    Users,
} from "lucide-react";

type SettingRowProps = {
    icon: React.ElementType;
    title: string;
    description: string;
    action?: React.ReactNode;
    danger?: boolean;
};

function SettingRow({
    icon: Icon,
    title,
    description,
    action,
    danger = false,
}: SettingRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex min-w-0 items-center gap-4">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        danger
                            ? "bg-red-50 text-red-500"
                            : "bg-[#F4EEFA] text-[#69409A]"
                    }`}
                >
                    <Icon size={19} />
                </div>

                <div className="min-w-0">
                    <h3
                        className={`text-sm font-semibold ${
                            danger ? "text-red-500" : "text-gray-900"
                        }`}
                    >
                        {title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                </div>
            </div>

            {action}
        </div>
    );
}

function Toggle({ enabled = true }: { enabled?: boolean }) {
    return (
        <button
            type="button"
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                enabled ? "bg-[#69409A]" : "bg-gray-200"
            }`}
            aria-label="Cambiar configuración"
        >
            <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    enabled ? "right-1" : "left-1"
                }`}
            />
        </button>
    );
}

function SelectControl({ children }: { children: React.ReactNode }) {
    return (
        <button
            type="button"
            className="flex min-w-[130px] items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-[#69409A]"
        >
            {children}
            <ChevronRight size={14} className="rotate-90 text-gray-400" />
        </button>
    );
}

export default function Page() {
    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1100px]">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Configuración
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Administra tu cuenta, preferencias y privacidad.
                    </p>
                </div>

                <div className="mt-7 space-y-6">
                    {/* Cuenta */}
                    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-5 py-4">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Cuenta
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Información básica de tu cuenta.
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            <SettingRow
                                icon={User}
                                title="Información personal"
                                description="Edita tu nombre, foto, fecha de nacimiento y otros datos."
                                action={
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                    >
                                        Editar
                                        <ChevronRight size={14} />
                                    </button>
                                }
                            />

                            <SettingRow
                                icon={Lock}
                                title="Contraseña y seguridad"
                                description="Cambia tu contraseña y revisa las opciones de seguridad."
                                action={
                                    <ChevronRight
                                        size={18}
                                        className="text-gray-400"
                                    />
                                }
                            />

                            <SettingRow
                                icon={Smartphone}
                                title="Sesiones activas"
                                description="Consulta los dispositivos donde has iniciado sesión."
                                action={
                                    <ChevronRight
                                        size={18}
                                        className="text-gray-400"
                                    />
                                }
                            />
                        </div>
                    </section>

                    {/* Preferencias */}
                    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-5 py-4">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Preferencias
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Personaliza tu experiencia en LES health.
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            <SettingRow
                                icon={Bell}
                                title="Notificaciones"
                                description="Recibe recordatorios de citas, medicamentos y novedades."
                                action={<Toggle enabled />}
                            />

                            <SettingRow
                                icon={Moon}
                                title="Modo oscuro"
                                description="Cambia entre el modo claro y oscuro."
                                action={<Toggle enabled={false} />}
                            />

                            <SettingRow
                                icon={Globe}
                                title="Idioma"
                                description="Selecciona el idioma de la aplicación."
                                action={
                                    <SelectControl>
                                        Español
                                    </SelectControl>
                                }
                            />

                            <SettingRow
                                icon={Palette}
                                title="Apariencia"
                                description="Personaliza algunos aspectos visuales de la aplicación."
                                action={
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                                    >
                                        Personalizar
                                        <ChevronRight size={14} />
                                    </button>
                                }
                            />
                        </div>
                    </section>

                    {/* Privacidad */}
                    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-5 py-4">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Privacidad y datos
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Controla cómo se utilizan y comparten tus datos.
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            <SettingRow
                                icon={Eye}
                                title="Visibilidad del perfil"
                                description="Controla qué información pueden ver otros usuarios."
                                action={
                                    <SelectControl>
                                        Solo usuarios
                                    </SelectControl>
                                }
                            />

                            <SettingRow
                                icon={ShieldCheck}
                                title="Datos de salud"
                                description="Administra los permisos relacionados con tu información médica."
                                action={
                                    <ChevronRight
                                        size={18}
                                        className="text-gray-400"
                                    />
                                }
                            />

                            <SettingRow
                                icon={CircleHelp}
                                title="Permisos y autorizaciones"
                                description="Revisa las aplicaciones y servicios que tienen acceso a tu cuenta."
                                action={
                                    <ChevronRight
                                        size={18}
                                        className="text-gray-400"
                                    />
                                }
                            />
                        </div>
                    </section>

                    {/* Specialist verification */}
                    <section className="overflow-hidden rounded-2xl bg-[#EDE1F5] shadow-sm">
                        <div className="p-6 lg:p-7">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#69409A] shadow-sm">
                                        <UserRoundCheck size={28} />
                                    </div>

                                    <div className="max-w-2xl">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#69409A]">
                                                PARA PROFESIONALES
                                            </span>

                                            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                Verificación segura
                                            </span>
                                        </div>

                                        <h2 className="mt-3 text-lg font-bold text-[#69409A]">
                                            ¿Eres un profesional de la salud?
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            Verifica tus credenciales para
                                            obtener una insignia de especialista
                                            y ofrecer tus servicios dentro de
                                            LES health.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-2">
                                                <FileCheck2
                                                    size={15}
                                                    className="text-[#69409A]"
                                                />
                                                Validación de credenciales
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <ShieldCheck
                                                    size={15}
                                                    className="text-[#69409A]"
                                                />
                                                Perfil verificado
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <Users
                                                    size={15}
                                                    className="text-[#69409A]"
                                                />
                                                Acceso para especialistas
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#69409A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#583383] active:scale-95"
                                >
                                    Verificarme como especialista
                                    <ArrowRight
                                        size={16}
                                    />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Help */}
                    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                    <CircleHelp size={19} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        ¿Necesitas ayuda?
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Consulta nuestro centro de ayuda o
                                        contacta con soporte.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Ir al centro de ayuda
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </section>

                    {/* Danger zone */}
                    <section className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
                        <div className="border-b border-red-50 px-5 py-4">
                            <h2 className="text-sm font-bold text-red-500">
                                Cuenta
                            </h2>
                        </div>

                        <div className="divide-y divide-red-50">
                            <SettingRow
                                icon={LogOut}
                                title="Cerrar sesión"
                                description="Salir de tu cuenta en este dispositivo."
                                danger
                                action={
                                    <ChevronRight
                                        size={18}
                                        className="text-red-300"
                                    />
                                }
                            />

                            <SettingRow
                                icon={Lock}
                                title="Eliminar cuenta"
                                description="Eliminar permanentemente tu cuenta y los datos asociados."
                                danger
                                action={
                                    <button
                                        type="button"
                                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                    >
                                        Eliminar
                                    </button>
                                }
                            />
                        </div>
                    </section>

                    <p className="pb-4 text-center text-[10px] text-gray-400">
                        LES health · Configuración de cuenta · v1.0.0
                    </p>
                </div>
            </div>
        </main>
    );
}