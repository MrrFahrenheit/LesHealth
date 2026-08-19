import { Clock } from "lucide-react";

export default function ArticleCard({ img, category, title, time }: { img: string, category: string, title: string, time: string }) {
    return (
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition">
            <img src={img} alt={title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-[#5C328E] uppercase tracking-wider mb-1">{category}</span>
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">{title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Clock className="w-3 h-3" /> {time}
                </div>
            </div>
        </div>
    )
}
