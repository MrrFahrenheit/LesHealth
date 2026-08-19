import { Heart, Star } from 'lucide-react';
import React from 'react'

export default function SpecialistCard({ name, specialty, rating, reviews, img }: { name: string, specialty: string, rating: string, reviews: string, img: string }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative cursor-pointer hover:shadow-md transition">
            <Heart className="w-5 h-5 text-gray-300 absolute top-4 right-4 hover:text-red-500 transition" />
            <div className="flex flex-col items-center text-center gap-2">
                <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover mb-2" />
                <div>
                    <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
                    <p className="text-xs text-[#5C328E] font-medium">{specialty}</p>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold text-gray-600">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{rating}</span>
                    <span className="text-gray-400 font-normal">({reviews} reseñas)</span>
                </div>
            </div>
        </div>
    );
}
