"use client";

import { useQuery } from '@tanstack/react-query';
import { getAIInsights } from '@/modules/les/api/signs.api';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIHealthInsights() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['ai-insights'],
        queryFn: getAIInsights,
        staleTime: 1000 * 60 * 5, // 5 minutes to avoid excessive api calls
    });

    if (isLoading) {
        return (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-purple-100 mb-6 flex items-center justify-center min-h-[100px]">
                <div className="flex items-center gap-3 text-purple-600 animate-pulse">
                    <Sparkles size={20} />
                    <span className="font-medium text-sm">Tu asistente médico está analizando tus datos...</span>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return null; // Silent fail if AI can't load
    }

    return (
        <div className="bg-gradient-to-r from-[#F8F5FC] to-[#F1F5F9] rounded-2xl p-6 shadow-sm border border-purple-100 mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={100} className="text-[#69409A]" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#69409A] p-2 rounded-lg">
                    <Sparkles size={16} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Análisis Inteligente</h3>
                <span className="bg-purple-100 text-[#69409A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ml-2">IA Beta</span>
            </div>
            
            <div className="text-sm text-gray-700 leading-relaxed prose prose-sm prose-purple max-w-none relative z-10">
                <ReactMarkdown>{data.insight}</ReactMarkdown>
            </div>
        </div>
    );
}

