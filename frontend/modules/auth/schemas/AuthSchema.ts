// schemas/authSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
    full_name:z.string(),
    email: z.string().email('Ingresa un correo valido'),
    password:z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>