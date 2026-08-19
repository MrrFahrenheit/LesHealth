"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Lun", value: 91 },
    { day: "Mar", value: 96 },
    { day: "Mié", value: 89 },
    { day: "Jue", value: 94 },
    { day: "Vie", value: 92 },
    { day: "Sáb", value: 88 },
    { day: "Dom", value: 93 },
];

export default function Chart() {
    return (
        // ResponsiveContainer tomará el 100% del padre. 
        // El tamaño se controla desde el contenedor en page.tsx
        <ResponsiveContainer width="100%" height="60%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#9CA3AF", fontSize: 12 }} 
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#9CA3AF", fontSize: 12 }} 
                    domain={["dataMin - 5", "dataMax + 5"]} 
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                    formatter={(value: any) => [`${value} mg/dL`, "Glucosa"]}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#69409A"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#69409A", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}