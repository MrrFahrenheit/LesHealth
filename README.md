# 🏥 LesHealth

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.23-336791?style=for-the-badge&logo=postgresql)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<strong>Plataforma integral para la gestión del autocuidado de pacientes con lupus</strong>

[Características](#-características) • [Tecnologías](#-stack-tecnológico) • [Instalación](#-instalación) • [Estructura](#-estructura-del-proyecto) • [Contacto](#-contacto--soporte)

</div>

---

## 📋 Descripción

LesHealth es una aplicación web orientada a la gestión integral del autocuidado para pacientes con lupus, integrando herramientas intuitivas y funcionales que facilitan el seguimiento de su salud, su tratamiento y su calidad de vida.

La plataforma combina un frontend moderno con un backend robusto para ofrecer una experiencia centrada en el paciente, con módulos para gestión de salud, prescripciones, rutinas, citas, información ambiental y comunidad.

---

## ✨ Características principales

- Gestión de usuarios y autenticación segura
- Registro de prescripciones y medicamentos
- Seguimiento de rutinas diarias y eventos clínicos
- Sistema de reservas para citas con especialistas
- Información sobre UV y recomendaciones de protección
- Comunidad para pacientes y soporte entre usuarios
- Carga y gestión de archivos o documentos relacionados con salud
- Notificaciones y recordatorios de actividades importantes

---

## 🛠️ Stack tecnológico

### Frontend
- Next.js 16.3
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- React Hook Form
- Zod
- TanStack React Query
- Zustand
- Lucide React
- Recharts
- Sonner
- Axios

### Backend
- NestJS 11
- TypeScript 5
- Prisma 7.9
- PostgreSQL
- JWT / Jose
- bcryptjs
- AWS SDK S3
- Nodemailer
- Class Validator
- Jest

### Herramientas y utilidades
- ESLint
- Prettier
- ts-jest
- Supertest
- Node.js
- npm

---

## 📁 Estructura del proyecto

```text
LesHealth/
├── backend/                       # API REST con NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/              # Autenticación y autorización
│   │   │   ├── user/              # Usuarios y perfiles
│   │   │   ├── prescription/      # Prescripciones y medicamentos
│   │   │   ├── routine/           # Rutinas diarias
│   │   │   ├── routine-event/     # Eventos del paciente
│   │   │   ├── reservation/       # Citas y reservas
│   │   │   ├── community/         # Comunidad y soporte
│   │   │   ├── sesion/            # Sesiones
│   │   │   ├── sign/              # Firmas o acciones de sistema
│   │   │   ├── notification/      # Notificaciones
│   │   │   ├── upload/            # Carga de archivos
│   │   │   └── uv-api/            # Integración de datos UV
│   │   ├── core/
│   │   │   └── database/          # Prisma y configuración BD
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── ...
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── test/
│   ├── package.json
│   ├── prisma.config.ts
│   └── README.md
│
├── frontend/                      # Aplicación web con Next.js
│   ├── app/
│   │   ├── actions/
│   │   ├── les/
│   │   ├── for-specialists/
│   │   ├── get-started/
│   │   ├── logout/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── ...
│   ├── components/
│   ├── lib/
│   ├── modules/
│   ├── providers/
│   ├── public/
│   ├── middleware.ts
│   ├── package.json
│   └── README.md
│
├── LICENSE
├── README.md
└── .gitignore
```

---

## 🚀 Instalación

### Requisitos previos
- Node.js 20 o superior
- npm
- PostgreSQL
- Git

### 1) Clonar el repositorio

```bash
git clone https://github.com/MrrFahrenheit/LesHealth.git
cd LesHealth
```

### 2) Configuración del backend

```bash
cd backend
npm install
```

Crea un archivo `.env` con tus variables de entorno:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/leshealth
PORT=3000
FRONTEND_URL=http://localhost:3001
JWT_SECRET=tu_secret_jwt
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=tu_region
```

Ejecuta las migraciones y levanta el servicio:

```bash
npx prisma migrate dev
npm run start:dev
```

### 3) Configuración del frontend

```bash
cd ../frontend
npm install
```

Crea un `.env.local` si es necesario:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Y inicia la app:

```bash
npm run dev
```

### 4) Acceder a la aplicación
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000`

---

## 🧪 Scripts disponibles

### Backend

```bash
npm run start
npm run start:dev
npm run start:debug
npm run build
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
npm run lint
npm run format
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 🏗️ Arquitectura general

La app sigue un diseño compuesto por dos capas principales:

- Frontend en Next.js para la experiencia de usuario y la navegación
- Backend en NestJS para la lógica de negocio, autenticación y acceso a datos
- Prisma como ORM para la base de datos PostgreSQL
- Integraciones con servicios externos como S3 y proveedores de correo

Este enfoque permite mantener una separación clara entre la interfaz, la lógica del negocio y la persistencia de datos.

---

## 📚 Documentación por módulos

- `Auth`: autenticación y control de acceso
- `User`: perfiles y usuarios
- `Prescription`: medicación y prescripciones
- `Routine`: rutinas diarias y seguimiento personal
- `Reservation`: sistema de citas y reservas
- `Community`: interacción entre usuarios
- `Upload`: administración de archivos y documentos
- `Notification`: alertas y recordatorios
- `UV API`: datos ambientales y recomendaciones de protección solar

---

## 🔒 Seguridad

- Validación de entradas con DTOs y validadores
- Encriptación de contraseñas con `bcryptjs`
- Autenticación basada en JWT
- CORS configurado en el backend
- Cookies de sesión protegidas
- Control de acceso por rutas y middleware

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres colaborar:

1. Haz un fork del proyecto
2. Crea una rama nueva
3. Realiza tus cambios
4. Envía un pull request

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Puedes revisar el archivo [LICENSE](LICENSE).

---

## 📞 Contacto & soporte

- Autor: [@MrrFahrenheit](https://github.com/MrrFahrenheit)
- Repositorio: [LesHealth](https://github.com/MrrFahrenheit/LesHealth)
- Issues: [GitHub Issues](https://github.com/MrrFahrenheit/LesHealth/issues)

---

<div align="center">

Hecho con ❤️ para mejorar el autocuidado y la calidad de vida de pacientes con lupus.

</div>
