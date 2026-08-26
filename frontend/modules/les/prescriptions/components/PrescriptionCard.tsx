import { Bell, CalendarDays, FileText, MoreVertical, Pill } from "lucide-react";
import { Prescription } from "../../api/prescriptions.api";

export function PrescriptionCard({ prescription }: { prescription: Prescription }) {
    const d = new Date(prescription.prescribed_date);
    const dateStr = d.toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-[#69409A]">
                            <Pill size={25} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-bold text-gray-900">
                                    {prescription.les_user_les_user_prescription_doctor_idToles_user?.full_name || 'Médico'}
                                </h3>
                                <span className="rounded-md px-2 py-1 text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                                    Activa
                                </span>
                            </div>

                            <p className="mt-1 text-sm font-medium text-[#69409A]">
                                {prescription.les_user_les_user_prescription_doctor_idToles_user?.specialty || 'General'}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays size={14} />
                                    {dateStr}
                                </span>
                                <span className="line-clamp-1">{prescription.description}</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3 rounded-xl bg-[#F8F5FC] p-4 sm:grid-cols-3">
                    <div>
                        <p className="text-xs text-gray-500">Indicaciones</p>
                        <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900 line-clamp-2">
                            {prescription.description}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#69409A] px-4 py-2.5 text-xs font-semibold text-[#69409A] transition hover:bg-[#F4EEFA]">
                        <FileText size={15} />
                        Ver detalles
                    </button>
                    <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]">
                        <Bell size={15} />
                        Recordatorios
                    </button>
                </div>
            </div>
        </article>
    );
}
