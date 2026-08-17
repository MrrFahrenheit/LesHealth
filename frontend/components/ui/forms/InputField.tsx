import React from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

export interface InputFieldProps<T extends FieldValues> extends UseControllerProps<T> {
    label: string;
    type?: string;
    placeholder?: string;
}

export default function InputField<T extends FieldValues>({ label,
    type = 'text',
    placeholder,
    ...controllerProps }: InputFieldProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController(controllerProps);
    return (
        <div className="flex flex-col gap-1 mb-4 items-start w-full">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                {...field}
                type={type}
                placeholder={placeholder}
                className={`px-3 py-1 border rounded-md outline-none transition w-full ${error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
            />
            {error && <span className="text-xs text-red-500">{error.message}</span>}
        </div>
    )
}
