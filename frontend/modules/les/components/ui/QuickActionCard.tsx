import { ArrowRight } from "lucide-react";

export default function QuickActionCard({ icon, title, subtitle, bgColor }: { icon: React.ReactNode, title: string, subtitle: string, bgColor: string }) {
    return (
        <div className={`${bgColor} rounded-2xl p-4 flex flex-col items-start gap-4 cursor-pointer hover:opacity-80 transition group relative overflow-hidden`}>
            <div className="bg-white p-2 rounded-xl shadow-sm">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{title}</h3>
                <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
        </div>
    );
}