"use client";

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserRoutines, updateRoutineEvent } from '@/modules/les/api/routines.api';
import { getTestResults } from '@/modules/les/api/signs.api';
import { useUser } from '@/providers/userProvider';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock, Pill } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';
import { toast } from 'sonner';

export const MedicationCalendar = () => {
    const user = useUser() as any;
    const queryClient = useQueryClient();
    const userId = user?.id || '';

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: routines, isLoading: routinesLoading } = useQuery({
        queryKey: ['routines', userId],
        queryFn: () => getUserRoutines(userId),
        enabled: !!userId
    });

    const { data: testResults, isLoading: resultsLoading } = useQuery({
        queryKey: ['test-results'],
        queryFn: getTestResults,
        enabled: !!userId
    });

    const updateEventMutation = useMutation({
        mutationFn: ({ id, is_pending, completed_at }: { id: string, is_pending: boolean, completed_at: string | null }) =>
            updateRoutineEvent(id, { is_pending, completed_at }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routines', userId] });
            toast.success('Estado del medicamento actualizado');
        },
        onError: () => {
            toast.error('Error al actualizar el estado');
        }
    });

    // Helper functions for Calendar
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Process events
    const allEvents = useMemo(() => {
        const events: any[] = [];
        if (routines) {
            events.push(...routines.flatMap(r => 
                r.les_routine_event.map(e => ({
                    ...e,
                    routine_title: r.title,
                    type: 'medication'
                }))
            ).filter(e => e.event_type === 'medication' && e.scheduled_for));
        }
        if (testResults) {
            events.push(...testResults.map((r: any) => ({
                id: `result-${r.id}`,
                title: r.test_name,
                routine_title: `Resultado: ${r.value} ${r.unit || ''}`,
                scheduled_for: r.date,
                is_pending: false,
                type: 'test-result'
            })));
        }
        return events;
    }, [routines, testResults]);

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const isToday = (d: Date) => isSameDay(d, new Date());

    const getEventsForDate = (date: Date) => {
        return allEvents.filter(e => e.scheduled_for && isSameDay(new Date(e.scheduled_for), date));
    };

    const selectedEvents = getEventsForDate(selectedDate);
    const todayEvents = getEventsForDate(new Date());
    
    // Some stats for the day
    const takenCount = selectedEvents.filter(e => !e.is_pending).length;
    const totalCount = selectedEvents.length;

    const toggleEventStatus = (event: any) => {
        if (event.type === 'test-result') return; // Cannot toggle test results
        const isPending = !event.is_pending;
        updateEventMutation.mutate({
            id: event.id,
            is_pending: isPending,
            completed_at: isPending ? null : new Date().toISOString()
        });
    };

    if (routinesLoading || resultsLoading) return <Loader text="Cargando calendario..." />;

    return (
        <div className="flex flex-col xl:flex-row gap-6 mt-6">
            {/* Calendar View */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Pill className="text-[#69409A]" size={20} />
                        Historial de Medicamentos
                    </h2>
                    <div className="flex items-center gap-4">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="font-medium text-gray-700 min-w-[120px] text-center">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-2 h-14 rounded-xl bg-gray-50/50" />
                    ))}
                    
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
                        const isSelected = isSameDay(selectedDate, date);
                        const isCurrentDay = isToday(date);
                        const dayEvents = getEventsForDate(date);
                        const hasEvents = dayEvents.length > 0;
                        const allTaken = hasEvents && dayEvents.every(e => !e.is_pending);

                        return (
                            <button
                                key={i}
                                onClick={() => setSelectedDate(date)}
                                className={`relative h-14 rounded-xl flex flex-col items-center justify-center transition
                                    ${isSelected ? 'bg-[#69409A] text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}
                                    ${isCurrentDay && !isSelected ? 'border-2 border-[#69409A] font-bold' : 'border border-transparent'}
                                `}
                            >
                                <span>{i + 1}</span>
                                {hasEvents && (
                                    <div className="flex gap-1 mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : (allTaken ? 'bg-emerald-500' : 'bg-orange-400')}`} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Details */}
            <div className="w-full xl:w-[400px] flex flex-col gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-1">
                        {isToday(selectedDate) ? 'Medicamentos de hoy' : `Medicamentos - ${selectedDate.toLocaleDateString()}`}
                    </h3>
                    <p className="text-sm text-gray-500 mb-5">
                        {totalCount === 0 ? 'No hay medicamentos programados.' : `${takenCount} de ${totalCount} tomados`}
                    </p>

                    <div className="space-y-3">
                        {selectedEvents.length === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <Pill className="mx-auto text-gray-400 mb-2" size={24} />
                                <p className="text-sm text-gray-500">Día libre de medicamentos</p>
                            </div>
                        ) : (
                            selectedEvents.map(event => (
                                <div key={event.id} className={`flex items-center gap-4 p-4 rounded-xl border transition ${!event.is_pending ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                                    <button 
                                        onClick={() => toggleEventStatus(event)}
                                        className="shrink-0 focus:outline-none"
                                        disabled={updateEventMutation.isPending}
                                    >
                                        {!event.is_pending ? (
                                            <CheckCircle2 className="text-emerald-500" size={24} />
                                        ) : (
                                            <Circle className="text-gray-300 hover:text-[#69409A] transition" size={24} />
                                        )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-semibold truncate ${!event.is_pending && event.type !== 'test-result' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                            {event.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                                            {event.type === 'test-result' ? (
                                                <span>{event.routine_title}</span>
                                            ) : (
                                                <>
                                                    <Clock size={12} />
                                                    {new Date(event.scheduled_for!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {isToday(selectedDate) && todayEvents.some(e => e.is_pending) && (
                    <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                        <div className="flex items-start gap-3">
                            <Clock className="text-orange-500 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-sm font-bold text-orange-700">Recordatorio activo</h4>
                                <p className="text-xs text-orange-600 mt-1">Tienes medicamentos pendientes de tomar hoy. No olvides registrar cuando los tomes.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
