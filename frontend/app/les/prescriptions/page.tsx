import React from "react";
import {
    ArrowRight,
    Bell,
    CalendarDays,
    Check,
    ChevronDown,
    Clock3,
    FileText,
    MoreVertical,
    Pill,
    Plus,
    RefreshCw,
    Stethoscope,
    X,
} from "lucide-react";

type Prescription = {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    condition: string;
    medications: number;
    duration: string;
    nextDose: string;
    status: "Activa" | "Completada" | "Suspendida";
};

const prescriptions: Prescription[] = [
    {
        id: 1,
        doctor: "Dra. María González",
        specialty: "Reumatología",
        date: "22 May 2025",
        condition: "Consulta de seguimiento",
        medications: 3,
        duration: "30 días",
        nextDose: "Hoy, 08:00 AM",
        status: "Activa",
    },
    {
        id: 2,
        doctor: "Dr. Carlos Méndez",
        specialty: "Gastroenterología",
        date: "30 Abr 2025",
        condition: "Gastritis crónica",
        medications: 2,
        duration: "15 días",
        nextDose: "Hoy, 01:00 PM",
        status: "Activa",
    },
    {
        id: 3,
        doctor: "Dra. Sofía Herrera",
        specialty: "Traumatología",
        date: "05 Abr 2025",
        condition: "Esguince de tobillo",
        medications: 2,
        duration: "10 días",
        nextDose: "15 Abr 2025",
        status: "Completada",
    },
];

function PrescriptionCard({
    prescription,
}: {
    prescription: Prescription;
}) {
    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                        <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                                prescription.status === "Activa"
                                    ? "bg-purple-50 text-[#69409A]"
                                    : prescription.status === "Completada"
                                      ? "bg-blue-50 text-blue-600"
                                      : "bg-red-50 text-red-500"
                            }`}
                        >
                            <Pill size={25} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-bold text-gray-900">
                                    {prescription.doctor}
                                </h3>

                                <span
                                    className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                                        prescription.status === "Activa"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : prescription.status ===
                                                "Completada"
                                              ? "bg-blue-50 text-blue-600"
                                              : "bg-red-50 text-red-500"
                                    }`}
                                >
                                    {prescription.status}
                                </span>
                            </div>

                            <p className="mt-1 text-sm font-medium text-[#69409A]">
                                {prescription.specialty}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays size={14} />
                                    {prescription.date}
                                </span>

                                <span>{prescription.condition}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3 rounded-xl bg-[#F8F5FC] p-4 sm:grid-cols-3">
                    <div>
                        <p className="text-xs text-gray-500">
                            Medicamentos
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <Pill size={15} className="text-[#69409A]" />

                            <span className="text-sm font-bold text-gray-900">
                                {prescription.medications}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Duración</p>

                        <div className="mt-1 flex items-center gap-2">
                            <RefreshCw
                                size={15}
                                className="text-[#69409A]"
                            />

                            <span className="text-sm font-bold text-gray-900">
                                {prescription.duration}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            {prescription.status === "Activa"
                                ? "Próxima dosis"
                                : "Finalizado"}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <Clock3 size={15} className="text-[#69409A]" />

                            <span className="text-sm font-bold text-gray-900">
                                {prescription.nextDose}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#69409A] px-4 py-2.5 text-xs font-semibold text-[#69409A] transition hover:bg-[#F4EEFA]"
                    >
                        <FileText size={15} />
                        Ver detalles
                    </button>

                    {prescription.status === "Activa" && (
                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]"
                        >
                            <Bell size={15} />
                            Recordatorios
                        </button>
                    )}
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
                            Mis Prescripciones
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Consulta y gestiona tus tratamientos médicos.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] active:scale-95"
                    >
                        <Plus size={17} />
                        Nueva prescripción
                    </button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    {/* MAIN */}
                    <section className="min-w-0">
                        {/* Tabs */}
                        <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
                            {[
                                "Activas",
                                "Historial",
                                "Suspendidas",
                                "Todas",
                            ].map((tab, index) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`relative whitespace-nowrap pb-3 text-sm font-medium transition ${
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

                        {/* Filter row */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-900">
                                    7
                                </span>{" "}
                                tratamientos registrados
                            </p>

                            <button
                                type="button"
                                className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600"
                            >
                                Ordenar por:
                                <span className="font-semibold text-gray-900">
                                    Más recientes
                                </span>

                                <ChevronDown size={15} />
                            </button>
                        </div>

                        {/* Prescription list */}
                        <div className="mt-4 space-y-4">
                            {prescriptions.map((prescription) => (
                                <PrescriptionCard
                                    key={prescription.id}
                                    prescription={prescription}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center gap-2">
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
                                            : "border border-gray-200 bg-white text-gray-600"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

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
                        {/* Treatment summary */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Resumen de tratamientos
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-xs text-gray-500"
                                >
                                    Este mes
                                    <ChevronDown size={14} />
                                </button>
                            </div>

                            <div className="mt-5 flex items-center gap-5">
                                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                                    <svg
                                        className="h-full w-full -rotate-90"
                                        viewBox="0 0 100 100"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="38"
                                            stroke="#EEE8F4"
                                            strokeWidth="10"
                                            fill="none"
                                        />

                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="38"
                                            stroke="#69409A"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray="170 240"
                                        />
                                    </svg>

                                    <div className="absolute text-center">
                                        <p className="text-xl font-bold text-gray-900">
                                            7
                                        </p>

                                        <p className="text-[10px] text-gray-500">
                                            Total
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-2 text-gray-600">
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                            Activas
                                        </span>

                                        <span className="font-bold text-gray-900">
                                            4
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-2 text-gray-600">
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#69409A]" />
                                            Completadas
                                        </span>

                                        <span className="font-bold text-gray-900">
                                            2
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-2 text-gray-600">
                                            <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                                            Suspendidas
                                        </span>

                                        <span className="font-bold text-gray-900">
                                            1
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reminder CTA */}
                        <div className="rounded-2xl bg-[#F3EBFA] p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#69409A] shadow-sm">
                                    <Bell size={20} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        No olvides tus medicamentos
                                    </h2>

                                    <p className="mt-2 text-xs leading-5 text-gray-500">
                                        Activa los recordatorios para no perder
                                        ninguna dosis.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 w-full rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]"
                            >
                                Configurar recordatorios
                            </button>
                        </div>

                        {/* Next doses */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Próximas tomas
                                </h2>

                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todas
                                </button>
                            </div>

                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <Pill size={18} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-900">
                                            Prednisona 5 mg
                                        </p>

                                        <p className="mt-1 text-[11px] text-gray-500">
                                            Hoy, 08:00 AM
                                        </p>
                                    </div>

                                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                                        En 30 min
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Pill size={18} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-900">
                                            Omeprazol 20 mg
                                        </p>

                                        <p className="mt-1 text-[11px] text-gray-500">
                                            Hoy, 01:00 PM
                                        </p>
                                    </div>

                                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
                                        En 5 h
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                                        <Pill size={18} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-900">
                                            Ibuprofeno 400 mg
                                        </p>

                                        <p className="mt-1 text-[11px] text-gray-500">
                                            Hoy, 08:00 PM
                                        </p>
                                    </div>

                                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
                                        En 12 h
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Add prescription */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4EEFA] text-[#69409A]">
                                    <FileText size={23} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        ¿Tienes una nueva receta?
                                    </h2>

                                    <p className="mt-2 text-xs leading-5 text-gray-500">
                                        Registra una prescripción emitida por
                                        tu médico.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#69409A] px-4 py-2.5 text-xs font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white"
                            >
                                <Plus size={15} />
                                Agregar prescripción
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}