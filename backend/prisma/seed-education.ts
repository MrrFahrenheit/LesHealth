import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const categoriesData = [
    { name: "Enfermedades autoinmunes", description: "Conoce más sobre enfermedades autoinmunes." },
    { name: "Corazón y vascular", description: "Cuidado y prevención cardiovascular." },
    { name: "Nutrición y alimentación", description: "Dietas y hábitos alimenticios." },
    { name: "Ejercicio y bienestar", description: "Mantente activo y saludable." },
    { name: "Salud mental", description: "Psicología y manejo del estrés." },
    { name: "Sueño y descanso", description: "Higiene del sueño." },
  ];

  for (const cat of categoriesData) {
    const existing = await prisma.les_education_category.findFirst({ where: { name: cat.name } });
    if (!existing) {
      await prisma.les_education_category.create({ data: cat });
    }
  }

  const autoimmuneCat = await prisma.les_education_category.findFirst({ where: { name: "Enfermedades autoinmunes" } });
  const nutritionCat = await prisma.les_education_category.findFirst({ where: { name: "Nutrición y alimentación" } });
  const mentalCat = await prisma.les_education_category.findFirst({ where: { name: "Salud mental" } });

  const courses = [
    {
      title: "¿Qué es el Lupus?",
      description: "Aprende sobre esta enfermedad autoinmune, sus síntomas y el manejo diario.",
      image_url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
      is_published: true,
      category_id: autoimmuneCat?.id,
      modules: [
        { title: "Introducción al Lupus", content: "El lupus es una enfermedad autoinmune...", order_index: 1 },
        { title: "Síntomas Comunes", content: "Los síntomas incluyen fatiga, dolor articular...", order_index: 2 },
      ]
    },
    {
      title: "Alimentación Antiinflamatoria",
      description: "Descubre qué alimentos pueden ayudarte a reducir la inflamación.",
      image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      is_published: true,
      category_id: nutritionCat?.id,
      modules: [
        { title: "Bases de la Nutrición Antiinflamatoria", content: "La dieta mediterránea...", order_index: 1 },
      ]
    },
    {
      title: "Higiene del Sueño",
      description: "Pequeños cambios, grandes resultados para dormir mejor.",
      image_url: "https://images.unsplash.com/photo-1455642305367-68834a2d4a32?auto=format&fit=crop&w=800&q=80",
      is_published: true,
      category_id: mentalCat?.id,
      modules: [
        { title: "Ciclos del Sueño", content: "Las fases del sueño son...", order_index: 1 },
      ]
    }
  ];

  for (const c of courses) {
    let course = await prisma.les_education_course.findFirst({ where: { title: c.title } });
    if (!course) {
      course = await prisma.les_education_course.create({
        data: {
          title: c.title,
          description: c.description,
          image_url: c.image_url,
          is_published: c.is_published,
          category_id: c.category_id,
        }
      });
    }

    for (const m of c.modules) {
      const existingModule = await prisma.les_education_module.findFirst({ where: { title: m.title, course_id: course.id } });
      if (!existingModule) {
        await prisma.les_education_module.create({
          data: {
            title: m.title,
            content: m.content,
            course_id: course.id,
            order_index: m.order_index,
          }
        });
      }
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
