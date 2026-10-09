"use client";

import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyPatients, Patient } from '@/modules/les/api/specialists.api';
import { createPrescription } from '@/modules/les/api/prescriptions.api';
import { getDoctorReservations, updateReservationStatus } from '@/modules/les/api/reservations.api';
import { createSign } from '@/modules/les/api/signs.api';
import { useUser } from '@/providers/userProvider';
import { ArrowLeft, UserRoundCheck, Pill, Activity, Plus, CalendarDays, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';

export default function ForSpecialistsPage() {
    const user = useUser();
    const router = useRouter();

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [isSignModalOpen, setIsSignModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'pacientes' | 'citas'>('pacientes');

    // Prescription form state
    const [prescriptionData, setPrescriptionData] = useState({ description: '', date: '' });
    const [medications, setMedications] = useState([{ medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: '' }]);

    // Sign form state
    const [signData, setSignData] = useState({ type: 'peso', value: '' });

    useEffect(() => {
        if (user && user.role !== 'doctor') {
            router.push('/les');
        }
    }, [user, router]);

    const { data: patients, isLoading } = useQuery({
        queryKey: ['my-patients'],
        queryFn: getMyPatients,
        enabled: user?.role === 'doctor'
    });

    const { data: reservations, isLoading: isLoadingReservations, refetch: refetchReservations } = useQuery({
        queryKey: ['doctor-reservations', user?.id],
        queryFn: () => getDoctorReservations(user?.id || ''),
        enabled: user?.role === 'doctor' && !!user?.id
    });

    const updateReservationMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateReservationStatus(id, status),
        onSuccess: () => {
            refetchReservations();
            toast.success("Estado de cita actualizado");
        }
    });

    const prescriptionMutation = useMutation({
        mutationFn: createPrescription,
        onSuccess: () => {
            setIsPrescriptionModalOpen(false);
            setPrescriptionData({ description: '', date: '' });
            setMedications([{ medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: '' }]);
            toast("Prescripción enviada correctamente al paciente.");
        }
    });

    const signMutation = useMutation({
        mutationFn: createSign,
        onSuccess: () => {
            setIsSignModalOpen(false);
            setSignData({ type: 'peso', value: '' });
            toast("Signo vital registrado correctamente.");
        }
    });

    const handlePrescriptionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPatient) return;
        prescriptionMutation.mutate({
            patient_id: selectedPatient.id,
            doctor_id: user?.id || '',
            prescribed_date: new Date(prescriptionData.date).toISOString(),
            description: prescriptionData.description,
            medications: medications.filter(m => m.medication_name)
        });
    };

    const handleSignSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPatient) return;
        signMutation.mutate({
            patient_id: selectedPatient.id,
            type: signData.type,
            value: parseFloat(signData.value)
        });
    };

    if (!user || user.role !== 'doctor') {
        return null;
    }

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1100px]">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/les" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition hover:text-gray-900">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">Portal de Especialistas</h1>
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">PERFIL VERIFICADO</span>
                        </div>
                        <p className="text-sm text-gray-500">Monitorea a tus pacientes, registra signos vitales y emite nuevas prescripciones.</p>
                    </div>
                </div>

                <div className="mt-8">
                    {/* Tabs */}
                    <div className="flex gap-6 overflow-x-auto border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab('pacientes')}
                            className={`relative whitespace-nowrap pb-3 text-sm font-medium transition ${activeTab === 'pacientes' ? 'text-[#69409A]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <div className="flex items-center gap-2">
                                <UserRoundCheck size={18} /> Mis Pacientes
                            </div>
                            {activeTab === 'pacientes' && <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#69409A]" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('citas')}
                            className={`relative whitespace-nowrap pb-3 text-sm font-medium transition ${activeTab === 'citas' ? 'text-[#69409A]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <div className="flex items-center gap-2">
                                <CalendarDays size={18} /> Citas Pendientes
                            </div>
                            {activeTab === 'citas' && <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#69409A]" />}
                        </button>
                    </div>

                    {activeTab === 'pacientes' && (
                        <>
                            {isLoading ? (
                        <Loader text="Cargando pacientes..." />
                    ) : patients && patients.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {patients.map((patient) => (
                                <div key={patient.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col transition hover:shadow-md">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-full bg-[#F4EEFA] text-[#69409A] flex items-center justify-center font-bold text-xl overflow-hidden shrink-0">
                                            {patient.avatar_url ? (
                                                <img src={patient.avatar_url} alt={patient.full_name} className="h-full w-full object-cover" />
                                            ) : patient.full_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{patient.full_name}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-1">{patient.email}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <p className="font-semibold text-xs text-gray-500 mb-1">Información Médica</p>
                                        {patient.les_user_medical_info ? (
                                            <ul className="space-y-1 text-xs">
                                                <li><span className="font-medium">Sangre:</span> {patient.les_user_medical_info.blood_type || 'N/A'}</li>
                                                <li className="line-clamp-1"><span className="font-medium">Alergias:</span> {patient.les_user_medical_info.allergies || 'Ninguna'}</li>
                                            </ul>
                                        ) : (
                                            <p className="text-xs italic text-gray-400">Sin información médica</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-auto">
                                        <button onClick={() => { setSelectedPatient(patient); setIsPrescriptionModalOpen(true); }} className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#F4EEFA] text-[#69409A] py-2 px-3 text-xs font-semibold transition hover:bg-[#EADDFA]">
                                            <Pill size={14} /> Recetar
                                        </button>
                                        <button onClick={() => { setSelectedPatient(patient); setIsSignModalOpen(true); }} className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-orange-50 text-orange-600 py-2 px-3 text-xs font-semibold transition hover:bg-orange-100">
                                            <Activity size={14} /> Signos
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="Sin pacientes" description="Aún no tienes pacientes bajo tu tutela. Cuando agenden una cita contigo o les emitas una receta, aparecerán aquí." />
                    )}
                        </>
                    )}

                    {activeTab === 'citas' && (
                        <>
                            {isLoadingReservations ? (
                                <Loader text="Cargando citas..." />
                            ) : reservations && reservations.length > 0 ? (
                                <div className="space-y-4">
                                    {reservations.map((reservation) => {
                                        const d = new Date(reservation.reservation_date);
                                        const month = d.toLocaleString('es', { month: 'short' }).toUpperCase();
                                        const day = d.getDate().toString();
                                        const weekday = d.toLocaleString('es', { weekday: 'short' });
                                        const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const patientName = reservation.les_user_les_user_reservation_patient_idToles_user?.full_name || 'Paciente';
                                        
                                        return (
                                            <article key={reservation.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                                                    {/* Date */}
                                                    <div className="flex h-24 w-full shrink-0 flex-col items-center justify-center rounded-xl bg-[#F4EEFA] lg:w-[74px]">
                                                        <span className="text-[10px] font-bold text-[#69409A]">{month}</span>
                                                        <span className="text-2xl font-bold text-[#69409A]">{day}</span>
                                                        <span className="text-xs text-gray-500 capitalize">{weekday}</span>
                                                        <span className="mt-1 text-[10px] font-medium text-gray-500">{time}</span>
                                                    </div>

                                                    {/* Patient Info */}
                                                    <div className="flex min-w-0 flex-1 items-start gap-4">
                                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#69409A] font-bold text-xl ring-4 ring-purple-50">
                                                            {patientName.charAt(0).toUpperCase()}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="text-sm font-bold text-gray-900">{patientName}</h3>
                                                                <span
                                                                    className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                                                                        reservation.status === "Confirmada"
                                                                            ? "bg-emerald-50 text-emerald-600"
                                                                            : reservation.status === "Cancelada" 
                                                                            ? "bg-red-50 text-red-600"
                                                                            : "bg-orange-50 text-orange-500"
                                                                    }`}
                                                                >
                                                                    {reservation.status}
                                                                </span>
                                                            </div>

                                                            <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                                                                {reservation.les_user_les_user_reservation_patient_idToles_user?.email || 'Sin email'}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-600">
                                                                <span className="font-semibold">Motivo:</span> {reservation.notes || 'Sin detalles adicionales'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 lg:ml-auto">
                                                        {reservation.status === 'pending' && (
                                                            <>
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => updateReservationMutation.mutate({ id: reservation.id, status: 'Confirmada' })}
                                                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 lg:flex-none"
                                                                >
                                                                    <Check size={16} /> Confirmar
                                                                </button>
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => updateReservationMutation.mutate({ id: reservation.id, status: 'Cancelada' })}
                                                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 lg:flex-none"
                                                                >
                                                                    <X size={16} /> Cancelar
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            ) : (
                                <EmptyState title="Sin citas pendientes" description="No hay citas agendadas por tus pacientes." />
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal para Prescripción */}
            <Modal isOpen={isPrescriptionModalOpen} onClose={() => setIsPrescriptionModalOpen(false)} title={`Recetar a ${selectedPatient?.full_name}`}>
                <form onSubmit={handlePrescriptionSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de receta</label>
                        <input required type="date" value={prescriptionData.date} onChange={e => setPrescriptionData({ ...prescriptionData, date: e.target.value })} min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicaciones Generales</label>
                        <textarea required value={prescriptionData.description} onChange={e => setPrescriptionData({ ...prescriptionData, description: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" rows={2}></textarea>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-800 text-sm">Medicamentos</h3>
                            <button type="button" onClick={() => setMedications([...medications, { medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: '' }])} className="text-[#69409A] text-xs font-bold hover:underline flex items-center gap-1">
                                <Plus size={14}/> Agregar otro
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2">
                            {medications.map((med, idx) => (
                                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <input required placeholder="Nombre (ej. Paracetamol)" value={med.medication_name} onChange={e => { const m = [...medications]; m[idx].medication_name = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input required placeholder="Dosis (ej. 500mg)" value={med.dosage} onChange={e => { const m = [...medications]; m[idx].dosage = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input required placeholder="Frecuencia" value={med.frequency} onChange={e => { const m = [...medications]; m[idx].frequency = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input type="number" min={1} required placeholder="Días" value={med.duration_days || ''} onChange={e => { const m = [...medications]; m[idx].duration_days = parseInt(e.target.value) || 7; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input placeholder="Notas" value={med.notes} onChange={e => { const m = [...medications]; m[idx].notes = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button disabled={prescriptionMutation.isPending} type="submit" className="w-full bg-[#69409A] text-white rounded-xl py-2.5 font-bold hover:bg-[#583383] transition mt-2">
                        {prescriptionMutation.isPending ? 'Guardando...' : 'Guardar y Enviar'}
                    </button>
                </form>
            </Modal>

            {/* Modal para Signos */}
            <Modal isOpen={isSignModalOpen} onClose={() => setIsSignModalOpen(false)} title={`Registrar Signo a ${selectedPatient?.full_name}`}>
                <form onSubmit={handleSignSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Signo</label>
                        <select required value={signData.type} onChange={e => setSignData({ ...signData, type: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="peso">Peso (kg)</option>
                            <option value="presion_arterial">Presión Arterial (mmHg)</option>
                            <option value="frecuencia_cardiaca">Frecuencia Cardíaca (lpm)</option>
                            <option value="temperatura">Temperatura (°C)</option>
                            <option value="glucosa">Glucosa (mg/dL)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                        <input required type="number" step="0.01" value={signData.value} onChange={e => setSignData({ ...signData, value: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Ej. 70.5" />
                    </div>
                    <button disabled={signMutation.isPending} type="submit" className="w-full bg-orange-500 text-white rounded-xl py-2.5 font-bold hover:bg-orange-600 transition mt-2">
                        {signMutation.isPending ? 'Guardando...' : 'Registrar'}
                    </button>
                </form>
            </Modal>
        </main>
    );
}
