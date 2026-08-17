// types/auth.ts
import { FieldValues, Path } from 'react-hook-form';

export type DynamicFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
};

export type iFormPage<TFieldValues extends FieldValues> = {
  title: string;
  fields: Array<DynamicFieldProps<TFieldValues>>;
};