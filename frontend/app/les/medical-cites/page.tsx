"use client";

import React, { useState } from "react";
import {
    ArrowRight, Bell, CalendarDays, Check, ChevronLeft, ChevronRight,
    Clock3, FileText, MapPin, MessageCircle, MoreVertical, Plus, Video, X,
} from "lucide-react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPatientReservations, createReservation, updateReservationStatus, Reservation } from '@/modules/les/api/reservations.api';
import { getDoctors } from '@/modules/les/api/specialists.api';
import { useUser } from '@/providers/userProvider';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';

function AppointmentCard({
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
        queryKey: ['reservations', userId],
        queryFn: () => getPatientReservations(userId),
        enabled: !!userId,
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
                                <option key={doc.id} value={doc.id}>{doc.full_name} - {doc.specialty || 'General'}</option>
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