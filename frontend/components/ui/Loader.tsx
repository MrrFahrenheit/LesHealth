"use client";

import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
}

export function Loader({ text = "Cargando..." }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-gray-500 w-full h-full min-h-[150px]">
      <Loader2 className="w-8 h-8 animate-spin text-[#5C328E] mb-2" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

