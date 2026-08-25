"use client";

import { useMutation, useQuery } from '@tanstack/react-query';
import { Activity, Check, Droplets, Heart, Moon, PlusIcon, Thermometer, Trash2, Weight, X } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { createSign } from "../../my-health/api/create-sign";
import { deleteSign } from "../../my-health/api/delete-sign";
import { getUserSigns } from "../../my-health/api/get-user-signs";
import { updateSign } from "../../my-health/api/update-sign";
import { SignFormData, typeEnum } from "../../my-health/schemas/SignSchema";
import Chart from "./Chart";
import HealthStatItem from "./HealthStatItem";

// 1. MEJORA: Separamos los tipos. Este es para la UI (menú seleccionado)
type SignUI = {
    index: number;
    type: string;
    icon: ReactNode;
    iconBg: string;
    name: string;
};

// 1. MEJORA: Este es el tipo real que devuelve tu base de datos/API
type SignRecord = {
    id: string;
    patient_id: string;
    type: string;
    value: string; // O number, según como lo envíe la API
    created_at: string;
};

export default function HealthSignsPanel() {
    const [signSelected, setSignSelected] = useState<SignUI>({
        index: 0,
        type: "Frecuencia Cardiaca",
        icon: <Heart />,
        iconBg: "bg-red-50",
        name: "frecuencia-cardiaca"
    });

    const [creatingSign, setCreatingSign] = useState<SignFormData>({
        type: 'frecuencia-cardiaca',
        value: 0
    });

    // 2. MEJORA: Tipamos correctamente el estado con los datos reales de la BD
    const [userSigns, setUserSigns] = useState<any>();

    // Estado para saber qué ID estamos editando actualmente
    const [editingId, setEditingId] = useState<string | null>(null);
    // Estado para guardar temporalmente lo que el usuario escribe antes de confirmar
    const [editValue, setEditValue] = useState<number | string>("");

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['userSigns'],
        queryFn: getUserSigns
    });

    useEffect(() => {
        if (data) {
            setUserSigns(data);
        }
    }, [data]);

    const createSignMutation = useMutation({
        mutationFn: createSign,
        onSuccess: () => refetch()
    });

    const updateSignMutation = useMutation({
        mutationFn: ({ id, type, value }: { id: string, type: string, value: number }) => updateSign(id, type, value),
        onSuccess: () => {
            refetch();
            setEditingId(null);
        }
    });

    const deleteSignMutation = useMutation({
        mutationFn: deleteSign,
        onSuccess: () => refetch()
    });

    const startEditing = (id: string, currentValue: number | string) => {
        setEditingId(id);
        setEditValue(currentValue);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditValue("");
    };

    const handleUpdate = async (id: string) => {
        if (editValue !== "") {
            updateSignMutation.mutate({ id, type: signSelected.name, value: Number(editValue) });
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
            deleteSignMutation.mutate(id);
        }
    };

    useEffect(() => {
        setCreatingSign((prev) => ({
            ...prev,
            type: signSelected.name as unknown as typeEnum,
        }))
    }, [signSelected.name])

    const handleCreate = async () => {
        if (creatingSign.value == null) return;
        createSignMutation.mutate(creatingSign);
    }

    const healthStats = [
        {
            name: "frecuencia-cardiaca",
            icon: <Heart className="w-5 h-5 text-red-500" />,
            iconBg: "bg-red-50",
            title: "Frecuencia cardíaca",
            value: "72",
            unit: "lpm",
            badgeText: "Normal",
            badgeColor: "bg-green-100 text-green-700",
            selected: ""
        },
        {
            name: "presion",
            icon: <Activity className="w-5 h-5 text-[#5C328E]" />,
            iconBg: "bg-purple-50",
            title: "Presión arterial",
            value: "120/80",
            unit: "mmHg",
            badgeText: "Normal",
            badgeColor: "bg-green-100 text-green-700"
        },
        {
            name: "glucosa",
            icon: <Droplets className="w-5 h-5 text-blue-500" />,
            iconBg: "bg-blue-50",
            title: "Glucosa",
            value: "92",
            unit: "mg/dL",
            badgeText: "Normal",
            badgeColor: "bg-green-100 text-green-700"
        },
        {
            name: "temperatura",
            icon: <Thermometer className="w-5 h-5 text-orange-500" />,
            iconBg: "bg-orange-50",
            title: "Temperatura",
            value: "36.6",
            unit: "°C",
            badgeText: "Normal",
            badgeColor: "bg-green-100 text-green-700"
        },
        {
            name: "calidad-sueno",
            icon: <Moon className="w-5 h-5 text-indigo-500" />,
            iconBg: "bg-indigo-50",
            title: "Calidad del sueño",
            value: "7.8",
            unit: "h",
            badgeText: "Buena",
            badgeColor: "bg-blue-100 text-blue-700"
        },
        {
            name: "peso",
            icon: <Weight className="w-5 h-5 text-teal-500" />,
            iconBg: "bg-teal-50",
            title: "Peso",
            value: "68",
            unit: "kg",
            badgeText: "Estable",
            badgeColor: "bg-blue-100 text-blue-700"
        }
    ];

    const handleSelect = (selectedSign: SignUI) => {
        setSignSelected(selectedSign);
    }

    const chartData = useMemo(() => {
        if (!userSigns) return [];
        const currentDataArray = userSigns[signSelected.name];

        if (!currentDataArray) return [];

        return currentDataArray.map((record: any) => ({
            ...record,
            value: Number(record.value),
            Day: new Date(record.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
            }),
        }));
    }, [userSigns, signSelected.name]);
    // ^ React solo recalculará esto si `userSigns` o `signSelected.name` cambian.

    const getLatestValue = (signName: string, fallbackValue: string) => {
        if (!userSigns) return fallbackValue;
        const list = userSigns[signName];
        if (!list || list.length === 0) return fallbackValue;

        // Retorna el último elemento agregado
        return list[list.length - 1].value;
    };

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-5">
            <section className="flex flex-col md:col-span-3">
                <div className="px-1">
                    <h2 className="text-lg font-bold text-gray-900">Tus signos</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Consulta tus principales indicadores de salud.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 mt-4">
                    {healthStats.map((current, index) => (
                        <HealthStatItem
                            key={index}
                            onSelect={signSelected.index === index}
                            icon={current.icon}
                            iconBg={current.iconBg}
                            title={current.title}
                            value={`${getLatestValue(current.name, current.value)} ${current.unit}`}
                            badgeText={current.badgeText}
                            badgeColor={current.badgeColor}
                            onClickF={() => handleSelect({
                                type: current.title,
                                index: index,
                                icon: current.icon,
                                iconBg: current.iconBg,
                                name: current.name
                            })}
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-col h-full w-full md:col-span-2 p-3">
                <div className="flex w-full gap-2 justify-center items-center">
                    <h2 className="text-lg font-bold text-gray-900">{signSelected.type}</h2>
                </div>

                <div className="w-full flex flex-col sm:w-4/5 h-full sm:h-80 items-center mt-4">

                    {/* 4. MEJORA: Pasamos los datos filtrados en lugar de intentar acceder como objeto */}
                    {chartData.length <= 0 ? <div className="flex w-full justify-center p-4 text-sm text-gray-400">
                        No hay Datos para dibujar.
                    </div> :
                        <Chart data={chartData} />
                    }
                    {/* ... (Tu formulario inferior se mantiene igual) ... */}
                    <div className="flex flex-col py-2 w-full">


                        <div className="flex flex-col py-2 w-full gap-4">
                            {/* Formulario para agregar nuevo signo */}
                            <div className="flex items-center gap-2 w-full p-2 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-[#69409A] focus-within:ring-2 focus-within:ring-[#69409A]/20 transition-all duration-200 shrink-0">
                                <select value={signSelected.name} className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200/70 border-r border-transparent rounded-xl outline-none cursor-pointer transition-colors shrink-0 max-w-[140px] sm:max-w-none"
                                    disabled><option value={""}>{signSelected.type}</option></select>

                                <input
                                    type="number"
                                    value={creatingSign.value || ''}
                                    onChange={(e) =>
                                        setCreatingSign((prev) => ({
                                            ...prev,
                                            value: parseFloat(e.target.value)
                                        }))
                                    }
                                    placeholder="Valor"
                                    className="w-full px-2 py-1.5 text-sm font-medium text-gray-800 placeholder-gray-400 bg-transparent outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    className="flex items-center justify-center p-2 text-white bg-[#69409A] hover:bg-[#583383] active:scale-95 rounded-xl transition-all shrink-0 cursor-pointer shadow-sm"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* LISTADO DE HISTORIAL CON SCROLL */}
                            {/* max-h-[200px] limita el alto, overflow-y-auto crea el scroll */}
                            <div className="flex flex-col gap-2 w-full max-h-[150px] overflow-y-auto pr-1">
                                {chartData.length > 0 ? (
                                    [...chartData].reverse().map((current) => (
                                        <div
                                            key={current.id}
                                            className="flex items-center justify-between w-full p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-300 transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                {/* Mini ícono representativo */}
                                                <div className={`p-1.5 rounded-lg ${signSelected.iconBg} [&>svg]:w-4 [&>svg]:h-4`}>
                                                    {signSelected.icon}
                                                </div>

                                                <div className="flex flex-col">
                                                    {/* LÓGICA DE EDICIÓN CONDICIONAL */}
                                                    {editingId === current.id ? (
                                                        <input
                                                            type="number"
                                                            autoFocus // Pone el cursor automáticamente al abrir
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            // Guardar al presionar Enter, cancelar con Escape
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleUpdate(current.id);
                                                                if (e.key === 'Escape') cancelEditing();
                                                            }}
                                                            className="text-sm font-bold text-gray-900 border-b-2 border-[#69409A] outline-none bg-transparent w-20 py-0.5"
                                                        />
                                                    ) : (
                                                        <span
                                                            onClick={() => startEditing(current.id, current.value)}
                                                            title="Haz clic para editar"
                                                            className="text-sm font-bold text-gray-800 cursor-pointer hover:text-[#69409A] transition-colors"
                                                        >
                                                            {current.value}
                                                        </span>
                                                    )}

                                                    {/* Formateamos la fecha */}
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(current.created_at).toLocaleDateString('es-ES', {
                                                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* BOTONES DE ACCIÓN (Derecha) */}
                                            <div className="flex items-center gap-1">
                                                {editingId === current.id ? (
                                                    <>
                                                        <button onClick={() => handleUpdate(current.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={cancelEditing} className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    // El botón de basura se muestra más suave y se oscurece al pasar el mouse por encima del div (group-hover)
                                                    <button
                                                        onClick={() => handleDelete(current.id)}
                                                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                        title="Eliminar registro"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex w-full justify-center p-4 text-sm text-gray-400">
                                        No hay registros previos.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    );
}

