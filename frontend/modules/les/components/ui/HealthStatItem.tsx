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
}

const selectedStyles: Record<HealthStatVariant, string> = {
    purple: "border-[#69409A] ring-1 ring-[#69409A]/10",
    blue: "border-blue-400 ring-1 ring-blue-400/10",
    green: "border-green-400 ring-1 ring-green-400/10",
    red: "border-red-400 ring-1 ring-red-400/10",
    orange: "border-orange-400 ring-1 ring-orange-400/10",
    yellow: "border-yellow-400 ring-1 ring-yellow-400/10",
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
}: HealthStatItemProps) {
    return (
        <div
            className={`
                flex @sm:flex-row flex-col
                items-start @sm:items-center
                gap-4
                md:justify-between
                rounded-2xl
                border
                bg-white
                p-4
                transition-all
                hover:cursor-pointer
                hover:bg-[#D2B5D8]
                max-h-32
                ${
                    selected
                        ? selectedStyles[selected]
                        : "border-transparent"
                }
            `}
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
    );
}