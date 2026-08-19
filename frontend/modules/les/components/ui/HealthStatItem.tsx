export default function HealthStatItem({ icon, iconBg, title, value, unit, badgeText, badgeColor }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-600">{title}</p>
                    <p className="text-lg font-bold text-gray-900">{value} <span className="text-sm font-medium text-gray-500">{unit}</span></p>
                </div>
            </div>
            <span className={`px-2 py-1 rounded-md text-xs font-bold ${badgeColor}`}>
                {badgeText}
            </span>
        </div>
    );
}