import { Bell, CalendarDays, FileText, MoreVertical, Pill, Trash, Edit } from "lucide-react";
import { Prescription, deletePrescription } from "../../api/prescriptions.api";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function PrescriptionCard({ prescription, onEdit }: { prescription: Prescription; onEdit?: (p: Prescription) => void }) {
    const queryClient = useQueryClient();
    const d = new Date(prescription.prescribed_date);
    const dateStr = d.toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' });
    const isActive = prescription.les_prescription_item?.some(item => {
        const endDate = new Date(prescription.prescribed_date);
        endDate.setDate(endDate.getDate() + (item.duration_days || 0));
        return endDate >= new Date();
    }) ?? true;
    const [menuOpen, setMenuOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: () => deletePrescription(prescription.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
            toast.success("Prescripción eliminada");
        },
        onError: () => {
            toast.error("Error al eliminar la prescripción");
        }
    });

    const handleDelete = () => {
        toast("¿Eliminar prescripción?", { action: { label: "Eliminar", onClick: () => {
            deleteMutation.mutate();
        } } });
    };

    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md relative">
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
                                {isActive ? (
                                    <span className="rounded-md px-2 py-1 text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                                        Activa
                                    </span>
                                ) : (
                                    <span className="rounded-md px-2 py-1 text-[10px] font-semibold bg-gray-100 text-gray-600">
                                        Finalizada
                                    </span>
                                )}
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

                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700">
                            <MoreVertical size={18} />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-10 w-32 rounded-lg bg-white shadow-lg border border-gray-100 z-10 flex flex-col p-1">
                                <button onClick={() => { setMenuOpen(false); onEdit?.(prescription); }} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md text-left">
                                    <Edit size={14} /> Editar
                                </button>
                                <button onClick={() => { setMenuOpen(false); handleDelete(); }} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md text-left">
                                    <Trash size={14} /> Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-xl bg-[#F8F5FC] p-4 flex flex-col gap-3">
                    <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Indicaciones Generales</p>
                        <div className="text-sm font-medium text-gray-900">
                            {prescription.description}
                        </div>
                    </div>
                    
                    {prescription.les_prescription_item && prescription.les_prescription_item.length > 0 && (
                        <div className="border-t border-purple-100 pt-3">
                            <p className="text-xs text-gray-500 font-semibold mb-2">Medicamentos (Autoprogramados en tu Calendario)</p>
                            <ul className="space-y-2">
                                {prescription.les_prescription_item.map(med => (
                                    <li key={med.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg p-2 border border-purple-50">
                                        <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                                            <Pill size={14} className="text-[#69409A]" />
                                            {med.medication_name} <span className="text-gray-500 font-normal">({med.dosage})</span>
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium">
                                            {med.frequency} por {med.duration_days} días
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#583383]">
                        <CalendarDays size={15} />
                        Ver en el calendario
                    </button>
                </div>
            </div>
        </article>
    );
}
