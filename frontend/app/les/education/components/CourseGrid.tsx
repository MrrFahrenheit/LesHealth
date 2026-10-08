"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Heart, Utensils, Dumbbell, Brain, Moon, Folder } from "lucide-react";
import { useUser } from "@/providers/userProvider";

const categoryStyles: Record<string, any> = {
    "Enfermedades autoinmunes": { icon: ShieldCheck, bg: "bg-purple-50", color: "text-[#69409A]" },
    "Corazón y vascular": { icon: Heart, bg: "bg-red-50", color: "text-red-500" },
    "Nutrición y alimentación": { icon: Utensils, bg: "bg-emerald-50", color: "text-emerald-500" },
    "Ejercicio y bienestar": { icon: Dumbbell, bg: "bg-blue-50", color: "text-blue-500" },
    "Salud mental": { icon: Brain, bg: "bg-indigo-50", color: "text-indigo-500" },
    "Sueño y descanso": { icon: Moon, bg: "bg-purple-50", color: "text-purple-500" },
};

interface CourseGridProps {
    courses: any[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
    const lesUser = useUser() as any;
    const userId = lesUser?.id;
    const [progressData, setProgressData] = useState<any>(null);

    useEffect(() => {
        if (!userId) return;
        const fetchProgress = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/users/${userId}/progress`);
                if (res.ok) {
                    const data = await res.json();
                    setProgressData(data);
                }
            } catch (e) {
                console.error("Error fetching progress", e);
            }
        };
        fetchProgress();
    }, [userId]);

    return (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {courses.map((course: any) => {
                const categoryName = course.les_category?.name || "";
                const style = categoryStyles[categoryName] || { icon: BookOpen, bg: "bg-purple-50", color: "text-[#69409A]" };
                const Icon = style.icon;

                const totalModules = course.les_module?.length || 0;
                let completedModulesCount = 0;

                if (progressData && progressData.moduleProgress && totalModules > 0) {
                    const courseModuleIds = course.les_module.map((m: any) => m.id);
                    completedModulesCount = progressData.moduleProgress.filter(
                        (p: any) => p.is_completed && courseModuleIds.includes(p.module_id)
                    ).length;
                }

                let percentage = 0;
                if (totalModules > 0) {
                    percentage = Math.round((completedModulesCount / totalModules) * 100);
                }

                return (
                    <Link key={course.id} href={`/les/education/${course.id}`} className="block">
                        <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:border-[#69409A] transition h-full flex flex-col">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.bg} ${style.color}`}>
                                    <Icon size={19} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold text-[#69409A]">
                                        Curso
                                    </span>
                                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                                        {course.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="mt-3 text-xs text-gray-400 line-clamp-2 flex-grow">
                                {course.description || "Curso general"}
                            </p>
                            <div className="mt-3">
                                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full bg-[#69409A] transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between text-[10px] font-semibold text-gray-500">
                                    <span>{completedModulesCount}/{totalModules} Módulos</span>
                                    <span className="text-[#69409A]">{percentage}%</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                );
            })}
            {courses.length === 0 && (
                <p className="text-sm text-gray-500 col-span-full">No hay cursos disponibles.</p>
            )}
        </div>
    );
}

