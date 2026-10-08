import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3, PlayCircle, FileText } from "lucide-react";
import { notFound } from "next/navigation";

async function getCourse(id: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/courses/${id}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch course');
        }
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = await getCourse(id);

    if (!course) {
        return notFound();
    }

    const modules = course.les_module || [];
    modules.sort((a: any, b: any) => a.order_index - b.order_index);

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1200px]">
                {/* Header Navigation */}
                <div className="mb-6">
                    <Link
                        href="/les/education"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#69409A] transition"
                    >
                        <ArrowLeft size={16} />
                        Volver a Educación
                    </Link>
                </div>

                {/* Course Header */}
                <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 md:items-center">
                    <img 
                        src={course.image_url || "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"} 
                        alt={course.title}
                        className="w-full md:w-64 h-48 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#69409A] text-xs font-bold mb-3">
                            <BookOpen size={14} />
                            {course.les_category?.name || "Curso"}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-2xl">
                            {course.description || "Sin descripción."}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                            <span className="flex items-center gap-1"><BookOpen size={14}/> {modules.length} Módulos</span>
                            <span className="flex items-center gap-1"><Clock3 size={14}/> A tu ritmo</span>
                        </div>
                    </div>
                </div>

                {/* Modules List */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Contenido del Curso</h2>
                    
                    {modules.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {modules.map((mod: any, index: number) => (
                                <Link 
                                    key={mod.id} 
                                    href={`/les/education/${course.id}/module/${mod.id}`}
                                    className="block rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:border-[#69409A] hover:shadow-md transition group"
                                >
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F8F5FC] text-[#69409A] flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#69409A] transition">{mod.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{mod.content}</p>
                                        </div>
                                        <div className="flex-shrink-0 pt-2 text-gray-300 group-hover:text-[#69409A]">
                                            {mod.video_url ? <PlayCircle size={24} /> : <FileText size={24} />}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl bg-white p-8 text-center border border-gray-100 shadow-sm">
                            <p className="text-gray-500">Este curso aún no tiene módulos disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

