"use client";

import { EmptyState } from '@/components/ui/EmptyState';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { createPrescription, updatePrescription, getPatientPrescriptions, Prescription } from '@/modules/les/api/prescriptions.api';
import { getDoctors } from '@/modules/les/api/specialists.api';
import { MedicationCalendar } from '@/modules/les/prescriptions/components/MedicationCalendar';
import { PrescriptionCard } from '@/modules/les/prescriptions/components/PrescriptionCard';
import { useUser } from '@/providers/userProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Plus
} from "lucide-react";
import React, { useState } from "react";

export default function Page() {
    const lesUser = useUser() as any;
    const userId = lesUser?.id || '';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Activas');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        doctor_id: '',
        date: '',
        description: ''
    });

    const [medications, setMedications] = useState([{
        medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: ''
    }]);

    const { data: prescriptions, isLoading, refetch } = useQuery({
        queryKey: ['prescriptions'],
        queryFn: () => getPatientPrescriptions(),
    });

    const { data: doctors } = useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors,
    });

    const createMutation = useMutation({
        mutationFn: createPrescription,
        onSuccess: () => {
            refetch();
            closeModal();
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => updatePrescription(editingId!, data),
        onSuccess: () => {
            refetch();
            closeModal();
        }
    });

    const openEditModal = (p: Prescription) => {
        setEditingId(p.id);
        setFormData({
            doctor_id: p.doctor_id,
            date: p.prescribed_date.split('T')[0],
            description: p.description
        });
        if (p.les_prescription_item && p.les_prescription_item.length > 0) {
            setMedications(p.les_prescription_item.map(item => ({
                medication_name: item.medication_name,
                dosage: item.dosage,
                frequency: item.frequency,
                duration_days: item.duration_days || 7,
                notes: item.notes || ''
            })));
        } else {
            setMedications([{ medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: '' }]);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ doctor_id: '', date: '', description: '' });
        setMedications([{ medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: '' }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const prescribed_date = new Date(formData.date).toISOString();
        const payload = {
            doctor_id: formData.doctor_id,
            prescribed_date,
            description: formData.description,
            medications: medications.filter(m => m.medication_name)
        };
        
        if (editingId) {
            updateMutation.mutate(payload);
        } else {
            createMutation.mutate(payload);
        }
    };

    const addMedication = () => {
        setMedications([...medications, { medication_name: '', dosage: '', frequency: '', duration_days: 7, notes: '' }]);
    };

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Mis Prescripciones</h1>
                        <p className="mt-1 text-sm text-gray-500">Consulta y gestiona tus tratamientos médicos.</p>
                    </div>

                    <button
                        onClick={() => { closeModal(); setIsModalOpen(true); }}
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] active:scale-95"
                    >
                        <Plus size={17} />
                        Nueva prescripción
                    </button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <section className="min-w-0">
                        {/* Tabs */}
                        <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
                            {["Activas", "Calendario"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    type="button" 
                                    className={`relative whitespace-nowrap pb-3 text-sm font-medium transition ${activeTab === tab ? 'text-[#69409A]' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {tab}
                                    {activeTab === tab && <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#69409A]" />}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        {activeTab === 'Activas' ? (
                            <div className="mt-5 space-y-4">
                                {isLoading ? (
                                    <Loader text="Cargando tus prescripciones..." />
                                ) : prescriptions && prescriptions.length > 0 ? (
                                    prescriptions.map((prescription) => (
                                        <PrescriptionCard
                                            key={prescription.id}
                                            prescription={prescription}
                                            onEdit={openEditModal}
                                        />
                                    ))
                                ) : (
                                    <EmptyState title="Sin prescripciones" description="No tienes prescripciones médicas registradas." />
                                )}
                            </div>
                        ) : (
                            <div className="mt-5">
                                <MedicationCalendar />
                            </div>
                        )}
                    </section>

                    {/* SIDEBAR */}
                    
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingId ? "Editar prescripción" : "Agregar prescripción"}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Médico que recetó</label>
                            <select required value={formData.doctor_id} onChange={e => setFormData({ ...formData, doctor_id: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                                <option value="">Selecciona un médico</option>
                                {doctors?.map(doc => (
                                    <option key={doc.id} value={doc.id}>{doc.full_name} - {doc.les_doctor_profile?.specialty || 'General'}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de receta</label>
                            <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicaciones Generales</label>
                        <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" rows={2}></textarea>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-800 text-sm">Medicamentos Recetados</h3>
                            <button type="button" onClick={addMedication} className="text-[#69409A] text-xs font-bold hover:underline flex items-center gap-1">
                                <Plus size={14}/> Agregar otro
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2">
                            {medications.map((med, idx) => (
                                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <input required placeholder="Nombre del medicamento (ej. Paracetamol)" value={med.medication_name} onChange={e => { const m = [...medications]; m[idx].medication_name = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input required placeholder="Dosis (ej. 500mg)" value={med.dosage} onChange={e => { const m = [...medications]; m[idx].dosage = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input required placeholder="Frecuencia (ej. Cada 8 horas)" value={med.frequency} onChange={e => { const m = [...medications]; m[idx].frequency = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input type="number" min={1} required placeholder="Días de duración" value={med.duration_days || ''} onChange={e => { const m = [...medications]; m[idx].duration_days = parseInt(e.target.value) || 7; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                    <div>
                                        <input placeholder="Notas adicionales" value={med.notes} onChange={e => { const m = [...medications]; m[idx].notes = e.target.value; setMedications(m); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button disabled={createMutation.isPending || updateMutation.isPending} type="submit" className="w-full bg-[#69409A] text-white rounded-xl py-2.5 font-bold hover:bg-[#583383] transition mt-2">
                        {createMutation.isPending || updateMutation.isPending ? 'Guardando...' : 'Guardar prescripción'}
                    </button>
                </form>
            </Modal>
        </main>
    );
}