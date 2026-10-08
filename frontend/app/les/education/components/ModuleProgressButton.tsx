"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useUser } from "@/providers/userProvider";
import { Loader } from "@/components/ui/Loader";

interface Props {
    moduleId: string;
    courseId: string;
}

export default function ModuleProgressButton({ moduleId, courseId }: Props) {
    const lesUser = useUser() as any;
    const userId = lesUser?.id;

    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const checkProgress = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/progress/modules/${moduleId}/users/${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.is_completed) {
                        setIsCompleted(true);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch progress", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkProgress();
    }, [userId, moduleId]);

    const handleToggleComplete = async () => {
        if (!userId) return;

        setIsUpdating(true);
        const newStatus = !isCompleted;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/progress/modules/${moduleId}/users/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_completed: newStatus }),
            });

            if (res.ok) {
                setIsCompleted(newStatus);
            }
        } catch (error) {
            console.error("Failed to update progress", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="text-sm text-gray-500">Cargando progreso...</div>;
    }

    if (!userId) {
        return null;
    }

    return (
        <button
            onClick={handleToggleComplete}
            disabled={isUpdating}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${
                isCompleted
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-green-500 hover:bg-green-600 text-white shadow-sm"
            } ${isUpdating ? "opacity-70 cursor-not-allowed" : ""}`}
        >
            {isCompleted ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} />}
            {isUpdating ? "Actualizando..." : isCompleted ? "Completado" : "Marcar como completado"}
        </button>
    );
}

