"use client"

import { Form } from '@/components/ui/forms/Form'
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from '@/modules/auth/schemas/AuthSchema';
import { iFormPage } from '@/types/auth';
import React, { useState } from 'react'

// Mejor práctica: Definir los tipos de las pestañas
type TabType = 'login' | 'register';

export default function AuthPage() {
    // 1. Estado para controlar la pestaña activa (Por defecto inicia en 'login')
    const [activeTab, setActiveTab] = useState<TabType>('login');

    const loginPageConfig: iFormPage<LoginFormData> = {
        title: 'Iniciar Sesión',
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
    };

    const registerPageConfig: iFormPage<RegisterFormData> = {
        title: 'Registrarse',
        fields:[
            {
                name:'fullName',
                label:'Nombre Completo',
                type:'text',
                placeholder:'Odallys'
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
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <span className="text-[#48276F] font-extrabold text-base md:text-2xl leading-relaxed secondary-font">
                Bienvenido a LesHealth
            </span>
            
            {/* 2. Contenedor de las pestañas con línea gris entera por debajo */}
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

            {/* 3. Renderizado condicional del formulario según la pestaña */}
            <div className="w-full">
                    <Form config={activeTab == "login"? loginPageConfig : registerPageConfig} 
                    schema={activeTab == "login"? loginSchema : registerSchema}
                    submitButtonText={activeTab == "login"? "Iniciar Sesion" : "Registrarse"}
                    />
            </div>
        </div>
    )
}