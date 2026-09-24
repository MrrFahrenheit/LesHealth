// @ts-nocheck
'use client';

import { iFormPage } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { ZodSchema } from 'zod';
import InputField from './InputField';

interface AuthFormProps<TFieldValues extends FieldValues> {
  config: iFormPage<TFieldValues>;
  schema: ZodSchema<TFieldValues>;
  defaultValues?: UseFormProps<TFieldValues>['defaultValues'];
  onSubmit: (data: TFieldValues) => void;
  submitButtonText?: string;
  generalError?: string;
}

export function Form<TFieldValues extends FieldValues>({
  config,
  schema,
  defaultValues,
  onSubmit,
  submitButtonText = 'Continuar',
  generalError,
}: AuthFormProps<TFieldValues>) {
  const { control, handleSubmit } = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="max-w-md mx-auto p-1 rounded-lg shadow-sm w-full overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className='max-h-full'>
        {/* Renderizado dinámico de los campos definidos en la config */}
        {config.fields.map((fieldProps) => (
          <InputField
            key={String(fieldProps.name)}
            control={control}
            {...fieldProps}
          />
        ))}

        {generalError && (
          <p role="alert" className="mb-3 text-sm text-red-500">
            {generalError}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-[#7A4D9A] text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
}