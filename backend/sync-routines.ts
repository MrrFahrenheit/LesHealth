import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, routine_type } from '@prisma/client';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function syncRoutines() {
  const prescriptions = await prisma.les_user_prescription.findMany({
    include: { les_prescription_item: true }
  });

  console.log(`Found ${prescriptions.length} prescriptions.`);

  for (const prescription of prescriptions) {
    const patientId = prescription.patient_id;
    const medications = prescription.les_prescription_item;
    const prescriptionId = prescription.id;
    const prescribedDate = prescription.prescribed_date;

    if (!medications || medications.length === 0) continue;

    // Clear existing routines generated from this prescription just in case
    await prisma.les_user_routine.deleteMany({
      where: {
        user_id: patientId,
        description: {
          contains: `[Ref: ${prescriptionId}]`
        }
      }
    });

    for (const med of medications) {
        const match = med.frequency.match(/\d+/);
        let hours = 24; 
        const lowerFreq = (med.frequency || '').toLowerCase();
        
        if (match && lowerFreq.includes('hora')) {
            hours = parseInt(match[0]) || 24;
        } else if (match && (lowerFreq.includes('dia') || lowerFreq.includes('día'))) {
            hours = 24 / (parseInt(match[0]) || 1);
        } else if (lowerFreq.includes('semana')) {
            hours = 24 * 7;
        } else if (lowerFreq.includes('mañana') && lowerFreq.includes('noche')) {
            hours = 12;
        } else if (lowerFreq.includes('comida') || lowerFreq.includes('desayuno') || lowerFreq.includes('cena')) {
            hours = 8;
        }

        const eventsCountPerDay = hours <= 24 ? Math.max(1, Math.floor(24 / hours)) : 1;
        const durationDays = med.duration_days || 7;
        
        const routineEvents = [];
        let startDate = prescribedDate ? new Date(prescribedDate) : new Date();
        startDate.setHours(8, 0, 0, 0); 

        for (let day = 0; day < durationDays; day++) {
            if (hours > 24) {
               if (day % (hours / 24) !== 0) continue;
            }

            for (let ev = 0; ev < eventsCountPerDay; ev++) {
                const scheduledDate = new Date(startDate);
                scheduledDate.setDate(startDate.getDate() + day);
                if (hours <= 24) {
                    scheduledDate.setHours(8 + (ev * hours), 0, 0, 0);
                }
                
                routineEvents.push({
                    title: `${med.dosage} - ${med.frequency}`,
                    event_type: 'medication' as routine_type,
                    scheduled_for: scheduledDate,
                    is_pending: true
                });
            }
        }

        await prisma.les_user_routine.create({
            data: {
                user_id: patientId,
                title: med.medication_name,
                description: `${med.notes || ''} [Ref: ${prescriptionId}]`.trim(),
                frequency: med.frequency,
                les_routine_event: {
                    create: routineEvents
                }
            }
        });
        console.log(`Generated routine for medication ${med.medication_name} (Prescription ${prescriptionId})`);
    }
  }

  console.log('Sync complete!');
}

syncRoutines()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });

