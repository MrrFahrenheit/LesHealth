"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTestResults, createTestResult, deleteTestResult } from '@/modules/les/api/signs.api';
import HealthStatItem from "./HealthStatItem";
import { FlaskConical, TestTube, Activity, Droplets, FileText, Plus, Trash } from "lucide-react";
import { Modal } from '@/components/ui/Modal';
import { toast } from "sonner";

export default function TestResultsPanel() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        test_name: '',
        value: '',
        unit: '',
        status: '',
        date: new Date().toISOString().split('T')[0]
    });

    const { data: results, isLoading } = useQuery({
        queryKey: ['test-results'],
        queryFn: getTestResults
    });

    const createMutation = useMutation({
        mutationFn: createTestResult,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test-results'] });
            setIsModalOpen(false);
            setFormData({ test_name: '', value: '', unit: '', status: '', date: new Date().toISOString().split('T')[0] });
            toast.success("Resultado guardado");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTestResult,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['test-results'] });
            toast.success("Resultado eliminado");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate({
            test_name: formData.test_name,
            value: formData.value,
            unit: formData.unit,
            status: formData.status,
            date: new Date(formData.date).toISOString()
        });
    };

    const getIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('colesterol')) return <TestTube className="w-5 h-5 text-blue-500" />;
        if (lower.includes('triglic')) return <Activity className="w-5 h-5 text-orange-500" />;
        if (lower.includes('creatinina')) return <Droplets className="w-5 h-5 text-cyan-500" />;
        if (lower.includes('orina')) return <FileText className="w-5 h-5 text-emerald-500" />;
        return <FlaskConical className="w-5 h-5 text-purple-500" />;
    };

    const getIconBg = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('colesterol')) return "bg-blue-50";
        if (lower.includes('triglic')) return "bg-orange-50";
        if (lower.includes('creatinina')) return "bg-cyan-50";
        if (lower.includes('orina')) return "bg-emerald-50";
        return "bg-purple-50";
    };

    const latestResults = results ? Object.values(
        results.reduce((acc: any, curr: any) => {
            if (!acc[curr.test_name] || new Date(curr.date) > new Date(acc[curr.test_name].date)) {
                acc[curr.test_name] = curr;
            }
            return acc;
        }, {})
    ) : [];

    return (
        <div>
            <div className="flex justify-between items-center mb-4 px-1">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Tus análisis y resultados
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Revisa los resultados más recientes de tus estudios.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-xl bg-[#69409A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#583383] active:scale-95"
                >
                    <Plus size={17} />
                    Agregar resultado
                </button>
            </div>

            {isLoading ? (
                <div className="text-gray-500 text-sm">Cargando resultados...</div>
            ) : latestResults.length === 0 ? (
                <div className="text-gray-500 text-sm">No tienes resultados registrados aún.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {latestResults.map((res: any) => (
                        <div key={res.id} className="relative group">
                            <HealthStatItem
                                icon={getIcon(res.test_name)}
                                iconBg={getIconBg(res.test_name)}
                                title={res.test_name}
                                value={res.value}
                                unit={res.unit || ""}
                                badgeText={res.status || "Normal"}
                                badgeColor={res.status && res.status.toLowerCase() !== 'normal' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                            />
                            <button onClick={() => { if (confirm("¿Eliminar este resultado?")) deleteMutation.mutate(res.id); }} className="absolute top-4 right-4 hidden group-hover:block p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                                <Trash size={15} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar resultado">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prueba o Estudio</label>
                        <input required placeholder="Ej. Hemoglobina" value={formData.test_name} onChange={e => setFormData({ ...formData, test_name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                            <input required placeholder="Ej. 14.2" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unidad (Opcional)</label>
                            <input placeholder="Ej. g/dL" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado / Interpretación</label>
                            <input placeholder="Ej. Normal, Alto" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                        </div>
                    </div>
                    <button disabled={createMutation.isPending} type="submit" className="w-full bg-[#69409A] text-white rounded-xl py-2.5 font-bold hover:bg-[#583383] transition mt-2">
                        {createMutation.isPending ? 'Guardando...' : 'Guardar resultado'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
