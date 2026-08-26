"use client";

import { EmptyState } from '@/components/ui/EmptyState';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { createReservation, getPatientReservations, Reservation, updateReservationStatus } from '@/modules/les/api/reservations.api';
import { getDoctors } from '@/modules/les/api/specialists.api';
import { AppointmentCard } from '@/modules/les/medical-cites/components/AppointmentCard';
import { useUser } from '@/providers/userProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Bell, CalendarDays,
    Plus
} from "lucide-react";
import React, { useState } from "react";

export default function Page() {
    const lesUser = useUser() as any;
    const userId = lesUser?.id || '';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        doctor_id: '',
        date: '',
        time: '',
        notes: ''
    });

    const { data: reservations, isLoading, refetch } = useQuery({
        queryKey: ['reservations'],
        queryFn: () => getPatientReservations(),
    });

    const { data: doctors } = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors,
    });

    const createMutation = useMutation({
        mutationFn: createReservation,
        onSuccess: () => {
            refetch();
            setIsModalOpen(false);
            setFormData({ doctor_id: '', date: '', time: '', notes: '' });
        }
    });

    const cancelMutation = useMutation({
        mutationFn: (id: string) => updateReservationStatus(id, 'Cancelada'),
        onSuccess: () => refetch()
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const reservation_date = new Date(`${formData.date}T${formData.time}`).toISOString();
        createMutation.mutate({
            doctor_id: formData.doctor_id,
            reservation_date,
            notes: formData.notes
        });
    };

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Citas Médicas</h1>
                        <p className="mt-1 text-sm text-gray-500">Gestiona tus citas médicas programadas y pasadas.</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] active:scale-95"
                    >
                        <Plus size={17} />
                        Agendar nueva cita
                    </button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <section className="min-w-0">
                        {/* Tabs */}
                        <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
                            {["Próximas citas"].map((tab) => (
                                <button key={tab} type="button" className={`relative whitespace-nowrap pb-3 text-sm font-medium transition text-[#69409A]`}>
                                    {tab}
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#69409A]" />
                                </button>
                            ))}
                        </div>

                        {/* Appointment list */}
                        <div className="mt-5 space-y-4">
                            {isLoading ? (
                                <Loader text="Cargando tus citas..." />
                            ) : reservations && reservations.length > 0 ? (
                                reservations.map((appointment) => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        onCancel={(id) => {
                                            if (window.confirm("¿Seguro que deseas cancelar esta cita?")) {
                                                cancelMutation.mutate(id);
                                            }
                                        }}
                                    />
                                ))
                            ) : (
                                <EmptyState title="No hay citas médicas" description="Aún no has agendado ninguna cita médica." />
                            )}
                        </div>
                    </section>

                    {/* SIDEBAR (Summary & Tips simplified for space) */}
                    <aside className="space-y-5">
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">Resumen de citas</h2>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-[#69409A]">
                                            <CalendarDays size={16} />
                                        </div>
                                        <span className="text-xs text-gray-600">Total citas</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{reservations?.length || 0}</span>
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
                                    <h2 className="text-sm font-bold text-[#69409A]">Recordatorios activados</h2>
                                    <p className="mt-2 text-xs leading-5 text-gray-500">Te enviaremos una notificación antes de cada cita.</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agendar nueva cita">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Especialista</label>
                        <select required value={formData.doctor_id} onChange={e => setFormData({ ...formData, doctor_id: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Selecciona un especialista</option>
                            {doctors?.map(doc => (
                                <option key={doc.id} value={doc.id}>{doc.full_name} - {doc.les_doctor_profile?.specialty || 'General'}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                            <input required type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de consulta (opcional)</label>
                        <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" rows={3}></textarea>
                    </div>
                    <button disabled={createMutation.isPending} type="submit" className="w-full bg-[#69409A] text-white rounded-xl py-2.5 font-bold hover:bg-[#583383] transition">
                        {createMutation.isPending ? 'Agendando...' : 'Agendar cita'}
                    </button>
                </form>
            </Modal>
        </main>
    );
}