"use client";
import SquareButton from "@/components/ui/buttons/SquareButton";
import { PenBoxIcon } from "lucide-react";
import { ReactNode } from "react";

type HealthStatVariant =
    | "purple"
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "yellow";

interface HealthStatItemProps {
    icon: ReactNode;
    iconBg: string;
    title: string;
    value: string | number;
    unit?: string;
    badgeText: string;
    badgeColor: string;
    selected?: HealthStatVariant;
    onSelect?: boolean;
    onClickF?: () => void;
}

const selectedStyles: Record<HealthStatVariant, string> = {
    purple: "border-[#69409A] ring-2 ring-[#69409A]/20 shadow-sm",
    blue: "border-blue-500 ring-2 ring-blue-500/20 shadow-sm",
    green: "border-green-500 ring-2 ring-green-500/20 shadow-sm",
    red: "border-red-500 ring-2 ring-red-500/20 shadow-sm",
    orange: "border-orange-500 ring-2 ring-orange-500/20 shadow-sm",
    yellow: "border-yellow-500 ring-2 ring-yellow-500/20 shadow-sm",
};

export default function HealthStatItem({
    icon,
    iconBg,
    title,
    value,
    unit,
    badgeText,
    badgeColor,
    selected,
    onSelect = false,
    onClickF = () => {}
}: HealthStatItemProps) {
    // Si está en estado onSelect, aplica el borde de la variante o uno púrpura por defecto
    const getBorderStyle = () => {
        if (onSelect) {
            return selected
                ? selectedStyles[selected]
                : "border-[#69409A] ring-2 ring-[#69409A]/20 shadow-sm";
        }
        return selected ? selectedStyles[selected] : "border-gray-200/80";
    };

    return (
        <div
            className={`
                flex @sm:flex-row flex-col
                items-start @sm:items-center
                gap-4
                md:justify-between
                rounded-2xl
                border-2
                bg-white
                p-4
                transition-all duration-200
                hover:cursor-pointer
                hover:bg-gray-50/80
                max-h-32
                ${getBorderStyle()}
            `}
            onClick={onClickF}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`
                        w-10 h-10 shrink-0
                        rounded-xl
                        flex items-center justify-center
                        ${iconBg}
                    `}
                >
                    {icon}
                </div>

                <div>
                    <p className="text-xs font-semibold text-gray-600">
                            {title}
                        </p>

                    <p className="text-md font-bold text-gray-900">
                        {value}{" "}
                        {unit && (
                            <span className="text-sm font-medium text-gray-500">
                                {unit}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex w-full items-center justify-between">
                <span
                    className={`
                        px-2 py-1
                        rounded-md
                        text-xs font-bold
                        whitespace-nowrap
                        ${badgeColor}
                    `}
                >
                    {badgeText}
                </span>
            </div>
        </div>
    );
}