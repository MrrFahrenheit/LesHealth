import { Clock3, Heart, MapPin, Star, UsersRound, Video } from "lucide-react";
import { Doctor } from "../api/specialists.api";
import Link from "next/link";

export function SpecialistCard({ specialist }: { specialist: Doctor }) {
    const profile = specialist.les_doctor_profile;
    
    // Si no hay perfil, mostramos algo por defecto
    const name = profile?.name || specialist.full_name;
    const specialty = profile?.specialty || "General";
    const image = profile?.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    const rating = profile?.rating || "0.0";
    const reviews = profile?.reviews_count || 0;
    const experience = profile?.experience_years || 0;
    const modality = profile?.modality || "Presencial";
    const location = profile?.location || "No especificada";
    const availability = profile?.availability_status || "Consultar disponibilidad";
    const isFeatured = profile?.is_featured || false;

    return (
        <article className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <img
                            src={image}
                            alt={name}
                            className="h-16 w-16 rounded-full object-cover ring-4 ring-purple-50"
                        />
                        {isFeatured && (
                            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                        )}
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-900 line-clamp-1" title={name}>
                            {name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-[#69409A]">
                            {specialty}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-full p-2 text-gray-400 transition hover:bg-purple-50 hover:text-[#69409A]"
                    aria-label={`Agregar a favoritos a ${name}`}
                >
                    <Heart size={18} />
                </button>
            </div>

            <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-800">{rating}</span>
                    <span>({reviews} reseñas)</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <UsersRound size={16} className="text-[#69409A]" />
                    <span>{experience} años de experiencia</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    {modality.toLowerCase().includes("virtual") ? (
                        <Video size={16} className="text-[#69409A]" />
                    ) : (
                        <MapPin size={16} className="text-[#69409A]" />
                    )}
                    <span>{modality} · {location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <Clock3 size={16} />
                    <span>{availability}</span>
                </div>
            </div>

            <Link
                href={`/les/user/${specialist.id}`}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#F4EEFA] px-4 py-2.5 text-lg font-semibold text-[#69409A] transition hover:bg-[#69409A] hover:text-white active:scale-[0.98]"
            >
                Ver perfil
            </Link>
        </article>
    );
}
