import { Reservation } from "../../api/reservations.api";

export function AppointmentCard({
    appointment,
    onCancel
}: {
    appointment: Reservation;
    onCancel: (id: string) => void;
}) {
    const d = new Date(appointment.reservation_date);
    const month = d.toLocaleString('es', { month: 'short' }).toUpperCase();
    const day = d.getDate().toString();
    const weekday = d.toLocaleString('es', { weekday: 'short' });
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Date */}
                <div className="flex h-24 w-full shrink-0 flex-col items-center justify-center rounded-xl bg-[#F4EEFA] lg:w-[74px]">
                    <span className="text-[10px] font-bold text-[#69409A]">{month}</span>
                    <span className="text-2xl font-bold text-[#69409A]">{day}</span>
                    <span className="text-xs text-gray-500 capitalize">{weekday}</span>
                    <span className="mt-1 text-[10px] font-medium text-gray-500">{time}</span>
                </div>

                {/* Doctor */}
                <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#69409A] font-bold text-xl ring-4 ring-purple-50">
                        {appointment.les_user_les_user_reservation_doctor_idToles_user?.full_name.charAt(0) || 'D'}
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-900">
                                {appointment.les_user_les_user_reservation_doctor_idToles_user?.full_name || 'Especialista'}
                            </h3>
                            <span
                                className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                                    appointment.status === "Confirmada"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : appointment.status === "Cancelada" 
                                        ? "bg-red-50 text-red-600"
                                        : "bg-orange-50 text-orange-500"
                                }`}
                            >
                                {appointment.status}
                            </span>
                        </div>

                        <p className="mt-1 text-xs font-medium text-[#69409A]">
                            {appointment.les_user_les_user_reservation_doctor_idToles_user?.specialty || 'General'}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                            {appointment.notes || 'Sin detalles adicionales'}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:ml-auto">
                    <button type="button" className="flex flex-1 items-center justify-center rounded-xl border border-[#69409A] px-4 py-2 text-xs font-semibold text-[#69409A] transition hover:bg-[#F4EEFA] lg:flex-none">
                        Ver detalles
                    </button>
                    {appointment.status !== 'Cancelada' && (
                        <button type="button" onClick={() => onCancel(appointment.id)} className="flex flex-1 items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 lg:flex-none">
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}