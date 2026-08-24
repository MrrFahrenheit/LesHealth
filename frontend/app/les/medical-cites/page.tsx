import React from "react";
import {
    ArrowRight,
    Bell,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    FileText,
    MapPin,
    MessageCircle,
    MoreVertical,
    Plus,
    Video,
    X,
} from "lucide-react";

type Appointment = {
    id: number;
    month: string;
    day: string;
    weekday: string;
    time: string;
    doctor: string;
    specialty: string;
    reason: string;
    location: string;
    modality: "Presencial" | "Virtual";
    status: "Confirmada" | "Pendiente";
    image: string;
};

const appointments: Appointment[] = [
    {
        id: 1,
        month: "MAY",
        day: "22",
        weekday: "Jue",
        time: "10:30 AM",
        doctor: "Dra. María González",
        specialty: "Reumatología",
        reason: "Consulta de seguimiento",
        location: "Consultorio 3 - LEShealth",
        modality: "Presencial",
        status: "Confirmada",
        image: "https://i.pravatar.cc/150?img=47",
    },
    {
        id: 2,
        month: "MAY",
        day: "30",
        weekday: "Vie",
        time: "02:00 PM",
        doctor: "Dr. Carlos Méndez",
        specialty: "Cardiología",
        reason: "Evaluación anual",
        location: "Consultorio 1 - LEShealth",
        modality: "Presencial",
        status: "Confirmada",
        image: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 3,
        month: "JUN",
        day: "05",
        weekday: "Jue",
        time: "11:00 AM",
        doctor: "Lic. Andrea Ruiz",
        specialty: "Nutrición",
        reason: "Plan nutricional personalizado",
        location: "Consulta en línea",
        modality: "Virtual",
        status: "Pendiente",
        image: "https://i.pravatar.cc/150?img=32",
    },
];

const calendarDays = [
    ["28", "29", "30", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9", "10", "11"],
    ["12", "13", "14", "15", "16", "17", "18"],
    ["19", "20", "21", "22", "23", "24", "25"],
    ["26", "27", "28", "29", "30", "31", "1"],
];

function AppointmentCard({
    appointment,
}: {
    appointment: Appointment;
}) {
    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Date */}
                <div className="flex h-24 w-full shrink-0 flex-col items-center justify-center rounded-xl bg-[#F4EEFA] lg:w-[74px]">
                    <span className="text-[10px] font-bold text-[#69409A]">
                        {appointment.month}
                    </span>

                    <span className="text-2xl font-bold text-[#69409A]">
                        {appointment.day}
                    </span>

                    <span className="text-xs text-gray-500">
                        {appointment.weekday}
                    </span>

                    <span className="mt-1 text-[10px] font-medium text-gray-500">
                        {appointment.time}
                    </span>
                </div>

                {/* Doctor */}
                <div className="flex min-w-0 flex-1 items-start gap-4">
                    <img
                        src={appointment.image}
                        alt={appointment.doctor}
                        className="h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-purple-50"
                    />

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-900">
                                {appointment.doctor}
                            </h3>

                            <span
                                className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                                    appointment.status === "Confirmada"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-orange-50 text-orange-500"
                                }`}
                            >
                                {appointment.status}
                            </span>
                        </div>

                        <p className="mt-1 text-xs font-medium text-[#69409A]">
                            {appointment.specialty}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            {appointment.reason}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                {appointment.modality === "Virtual" ? (
                                    <Video
                                        size={14}
                                        className="text-[#69409A]"
                                    />
                                ) : (
                                    <MapPin
                                        size={14}
                                        className="text-[#69409A]"
                                    />
                                )}

                                {appointment.location}
                            </span>

                            <span
                                className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                                    appointment.modality === "Virtual"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-purple-50 text-[#69409A]"
                                }`}
                            >
                                {appointment.modality}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:ml-auto">
                    <button
                        type="button"
                        className="flex flex-1 items-center justify-center rounded-xl border border-[#69409A] px-4 py-2 text-xs font-semibold text-[#69409A] transition hover:bg-[#F4EEFA] lg:flex-none"
                    >
                        Ver detalles
                    </button>

                    {appointment.id === 1 && (
                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center rounded-xl bg-[#69409A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#583383] lg:flex-none"
                        >
                            Prepararme
                        </button>
                    )}

                    {appointment.id === 2 && (
                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 lg:flex-none"
                        >
                            Reagendar
                        </button>
                    )}

                    {appointment.id === 3 && (
                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 lg:flex-none"
                        >
                            Cancelar
                        </button>
                    )}

                    <button
                        type="button"
                        className="hidden rounded-lg p-2 text-gray-400 transition hover:bg-gray-50 lg:block"
                    >
                        <MoreVertical size={18} />
                    </button>
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
                            Citas Médicas
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Gestiona tus citas médicas programadas y pasadas.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] active:scale-95"
                    >
                        <Plus size={17} />
                        Agendar nueva cita
                    </button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    {/* MAIN */}
                    <section className="min-w-0">
                        {/* Tabs */}
                        <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
                            {[
                                "Próximas citas",
                                "Historial",
                                "Solicitudes",
                                "Canceladas",
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

                        {/* Appointment list */}
                        <div className="mt-5 space-y-4">
                            {appointments.map((appointment) => (
                                <AppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                />
                            ))}
                        </div>

                        {/* Empty / CTA */}
                        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-purple-100 bg-[#F7F1FB] p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#69409A] shadow-sm">
                                    <CalendarDays size={22} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        ¿Necesitas agendar una cita?
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Encuentra el especialista que necesitas
                                        y elige el horario que mejor se adapte
                                        a ti.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#69409A] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]"
                            >
                                Agendar ahora
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Tips */}
                        <div className="mt-7">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Consejos para tu cita
                                </h2>

                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#69409A]"
                                >
                                    Ver más
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                        <Clock3 size={19} />
                                    </div>

                                    <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                        Llega 10 minutos antes
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Así tendrás tiempo para prepararte
                                        mejor.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FileText size={19} />
                                    </div>

                                    <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                        Lleva tus exámenes
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Ten disponibles tus estudios más
                                        recientes.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <MessageCircle size={19} />
                                    </div>

                                    <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                        Lista de medicamentos
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Lleva una lista actualizada de tus
                                        medicamentos.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                                        <Bell size={19} />
                                    </div>

                                    <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                        Anota tus dudas
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Escribe tus preguntas para no
                                        olvidarlas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SIDEBAR */}
                    <aside className="space-y-5">
                        {/* Calendar */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Calendario
                                </h2>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    <span className="mx-1 text-xs font-semibold text-gray-800">
                                        Mayo 2025
                                    </span>

                                    <button
                                        type="button"
                                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-7 gap-y-3 text-center">
                                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(
                                    (day) => (
                                        <span
                                            key={day}
                                            className="text-[10px] font-semibold text-gray-400"
                                        >
                                            {day}
                                        </span>
                                    )
                                )}

                                {calendarDays.flatMap((week, weekIndex) =>
                                    week.map((day, dayIndex) => {
                                        const isCurrent =
                                            weekIndex === 3 && day === "22";

                                        const hasAppointment =
                                            day === "19" ||
                                            day === "22" ||
                                            day === "30";

                                        const isOutside =
                                            (weekIndex === 0 &&
                                                ["28", "29", "30"].includes(
                                                    day
                                                )) ||
                                            (weekIndex === 4 && day === "1");

                                        return (
                                            <button
                                                key={`${weekIndex}-${dayIndex}`}
                                                type="button"
                                                className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs transition ${
                                                    isCurrent
                                                        ? "bg-[#69409A] font-bold text-white"
                                                        : isOutside
                                                          ? "text-gray-300"
                                                          : "text-gray-600 hover:bg-purple-50 hover:text-[#69409A]"
                                                }`}
                                            >
                                                {day}

                                                {hasAppointment &&
                                                    !isCurrent && (
                                                        <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#69409A]" />
                                                    )}
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className="mt-5 border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="h-2 w-2 rounded-full bg-[#69409A]" />
                                    Cita programada
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                                    Solicitud pendiente
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Cita completada
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Resumen de citas
                            </h2>

                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-[#69409A]">
                                            <CalendarDays size={16} />
                                        </div>

                                        <span className="text-xs text-gray-600">
                                            Próximas citas
                                        </span>
                                    </div>

                                    <span className="text-sm font-bold text-gray-900">
                                        3
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                            <Check size={16} />
                                        </div>

                                        <span className="text-xs text-gray-600">
                                            Citas completadas
                                        </span>
                                    </div>

                                    <span className="text-sm font-bold text-gray-900">
                                        12
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                                            <X size={16} />
                                        </div>

                                        <span className="text-xs text-gray-600">
                                            Citas canceladas
                                        </span>
                                    </div>

                                    <span className="text-sm font-bold text-gray-900">
                                        2
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                            <Clock3 size={16} />
                                        </div>

                                        <span className="text-xs text-gray-600">
                                            Solicitudes pendientes
                                        </span>
                                    </div>

                                    <span className="text-sm font-bold text-gray-900">
                                        1
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Reminders */}
                        <div className="rounded-2xl bg-[#F3EBFA] p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#69409A]">
                                    <Bell size={19} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        Recordatorios activados
                                    </h2>

                                    <p className="mt-2 text-xs leading-5 text-gray-500">
                                        Te enviaremos una notificación antes
                                        de cada cita.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#69409A] bg-white px-4 py-2.5 text-xs font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white"
                            >
                                Configurar recordatorios
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}