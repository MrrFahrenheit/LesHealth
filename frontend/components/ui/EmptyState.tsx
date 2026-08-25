"use client";

import { FolderOpen } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-gray-50/80 rounded-2xl p-5 border border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left w-full">
      {icon || <FolderOpen className="w-8 h-8 text-gray-400" />}
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {action && <div className="md:ml-auto">{action}</div>}
    </div>
  );
}

