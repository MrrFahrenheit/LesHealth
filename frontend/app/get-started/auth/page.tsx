"use client";

import { Form } from '@/components/ui/forms/Form';
import { LoginUser } from '@/modules/auth/api/login-user';
import { registerUser } from '@/modules/auth/api/register-user';
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from '@/modules/auth/schemas/AuthSchema';
import { iFormPage } from '@/types/auth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';

type TabType = 'login' | 'register';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<TabType>('login');


    const router = useRouter();
        const pathName = usePathname();
    
        const handleNavigate = (site: string) => {
            router.push(`${pathName}/${site}`);
        }
    

    // Diccionario de configuración para cada pestaña
    const activeTabConfig = {
        login: {
            fun: (data:any) => LoginUser(data as LoginFormData),

            config: {
                title: 'Iniciar Sesión',
                defaultValues: { email: '', password: '' },
                fields: [
                    {
                        name: 'email',
                        label: 'Correo Electrónico',
                        type: 'email',
                        placeholder: 'usuario@correo.com',
                    },
                    {
                        name: 'password',
                        label: 'Contraseña',
                        type: 'password',
                        placeholder: '••••••••',
                    }
                ],
            } as iFormPage<LoginFormData>,
            schema: loginSchema,
            submitButtonText: "Iniciar Sesión"
        },
        register: {
            fun: (data:any) => registerUser(data as RegisterFormData),

            config: {
                title: 'Registrarse',
                defaultValues: { full_name: '', email: '', password: '' },
                fields: [
                    {
                        name: 'full_name',
                        label: 'Nombre Completo',
                        type: 'text',
                        placeholder: 'Odallys'
                    },
                    {
                        name: 'email',
                        label: 'Correo Electrónico',
                        type: 'email',
                        placeholder: 'usuario@correo.com',
                    },
                    {
                        name: 'password',
                        label: 'Contraseña',
                        type: 'password',
                        placeholder: '••••••••',
                    },
                ]
            } as iFormPage<RegisterFormData>,
            schema: registerSchema,
            submitButtonText: "Registrarse"
        }
    };

    const handleSubmit = async (data: FieldValues) => {
        try {
            const currentConfig = activeTabConfig[activeTab];
                    
            const result = await currentConfig.fun(data);

            handleNavigate('/les')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <span className="text-[#48276F] font-extrabold text-base md:text-2xl leading-relaxed secondary-font">
                Bienvenido a LesHealth
            </span>

            {/* Contenedor de las pestañas con línea gris entera por debajo */}
            <div className="flex items-center w-full md:w-3/5 my-6 border-b-2 border-gray-200">

                {/* PESTAÑA: REGISTRARSE */}
                <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`
                        w-1/2 pb-3 text-center transition-all duration-300 nunito text-lg focus:outline-none
                        ${activeTab === 'register'
                            ? 'text-[#48276F] font-bold border-b-2 border-[#48276F] -mb-[2px]'
                            : 'text-gray-400 font-semibold hover:text-gray-600'
                        }
                    `}
                >
                    Registrarse
                </button>

                {/* PESTAÑA: INICIAR SESIÓN */}
                <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`
                        w-1/2 pb-3 text-center transition-all duration-300 nunito text-lg focus:outline-none
                        ${activeTab === 'login'
                            ? 'text-[#48276F] font-bold border-b-2 border-[#48276F] -mb-[2px]'
                            : 'text-gray-400 font-semibold hover:text-gray-600'
                        }
                    `}
                >
                    Iniciar Sesión
                </button>

            </div>

            {/* Renderizado del formulario utilizando el diccionario y spread operator */}
            <div className="w-full">
                <Form
                    {...activeTabConfig[activeTab]}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}