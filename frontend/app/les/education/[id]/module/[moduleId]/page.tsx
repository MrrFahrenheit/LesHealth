import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";
import ModuleProgressButton from "../../../components/ModuleProgressButton";

async function getCourse(id: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/'}education/courses/${id}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        return null;
    }
}

export default async function ModulePage({ params }: { params: Promise<{ id: string, moduleId: string }> }) {
    const { id, moduleId } = await params;
    const course = await getCourse(id);

    if (!course) {
        return notFound();
    }

    const currentModule = course.les_module?.find((m: any) => m.id === moduleId);

    if (!currentModule) {
        return notFound();
    }

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[900px]">
                {/* Navigation */}
                <div className="mb-6">
                    <Link
                        href={`/les/education/${course.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#69409A] transition"
                    >
                        <ArrowLeft size={16} />
                        Volver a {course.title}
                    </Link>
                </div>

                <div className="rounded-2xl bg-white p-6 md:p-10 shadow-sm border border-gray-100">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#69409A] text-xs font-bold mb-4">
                        <BookOpen size={14} />
                        Módulo {currentModule.order_index}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentModule.title}</h1>

                    {currentModule.video_url && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 bg-gray-900">
                            {/* Assuming iframe for youtube or similar video source */}
                            <iframe 
                                src={currentModule.video_url} 
                                className="w-full h-full"
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            />
                        </div>
                    )}

                    <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed">
                        {currentModule.content.split('\n').map((paragraph: string, i: number) => (
                            <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
                        <ModuleProgressButton moduleId={moduleId} courseId={course.id} />
                    </div>
                </div>
            </div>
        </main>
    );
}

