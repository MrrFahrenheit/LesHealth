import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { routine_type } from '@prisma/client';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateRoutinesForMedications(
    patientId: string,
    prescribedDate: Date | null,
    medications: any[],
    prescriptionId: string,
  ) {
    if (!medications || medications.length === 0) return;

    // First, clear any existing routines for this prescription if it's an update
    await this.prisma.les_user_routine.deleteMany({
      where: {
        user_id: patientId,
        description: {
          contains: `[Ref: ${prescriptionId}]`,
        },
      },
    });

    for (const med of medications) {
      const match = med.frequency.match(/\d+/);
      let hours = 24;
      const lowerFreq = (med.frequency || '').toLowerCase();

      if (match && lowerFreq.includes('hora')) {
        hours = parseInt(match[0]) || 24;
      } else if (
        match &&
        (lowerFreq.includes('dia') || lowerFreq.includes('día'))
      ) {
        hours = 24 / (parseInt(match[0]) || 1);
      } else if (lowerFreq.includes('semana')) {
        hours = 24 * 7;
      } else if (lowerFreq.includes('mañana') && lowerFreq.includes('noche')) {
        hours = 12;
      } else if (
        lowerFreq.includes('comida') ||
        lowerFreq.includes('desayuno') ||
        lowerFreq.includes('cena')
      ) {
        hours = 8;
      }

      const eventsCountPerDay =
        hours <= 24 ? Math.max(1, Math.floor(24 / hours)) : 1;
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
            scheduledDate.setHours(8 + ev * hours, 0, 0, 0);
          }

          routineEvents.push({
            title: `${med.dosage} - ${med.frequency}`,
            event_type: routine_type.medication,
            scheduled_for: scheduledDate,
            is_pending: true,
          });
        }
      }

      await this.prisma.les_user_routine.create({
        data: {
          user_id: patientId,
          title: med.medication_name,
          description: `${med.notes || ''} [Ref: ${prescriptionId}]`.trim(),
          frequency: med.frequency,
          les_routine_event: {
            create: routineEvents,
          },
        },
      });
    }
  }

  async create(data: any) {
    const { medications, ...prescriptionData } = data;
    const prescription = await this.prisma.les_user_prescription.create({
      data: {
        ...prescriptionData,
        les_prescription_item: medications
          ? { create: medications }
          : undefined,
      },
      include: {
        les_prescription_item: true,
      },
    });

    try {
      await this.generateRoutinesForMedications(
        prescription.patient_id,
        prescription.prescribed_date,
        medications,
        prescription.id,
      );
    } catch (e) {
      console.error('Failed to generate routines', e);
    }

    return prescription;
  }

  async findAll() {
    return this.prisma.les_user_prescription.findMany({
      include: { les_prescription_item: true },
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.les_user_prescription.findMany({
      where: { patient_id: patientId },
      include: {
        les_prescription_item: true,
        les_user_les_user_prescription_doctor_idToles_user: true,
      },
    });
  }

  async findOne(id: string) {
    const prescription = await this.prisma.les_user_prescription.findUnique({
      where: { id },
      include: { les_prescription_item: true },
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(id: string, data: any) {
    await this.findOne(id); // Check existence
    const { medications, ...prescriptionData } = data;

    const updateData: any = { ...prescriptionData };

    if (medications) {
      updateData.les_prescription_item = {
        deleteMany: {},
        create: medications,
      };
    }

    const prescription = await this.prisma.les_user_prescription.update({
      where: { id },
      data: updateData,
      include: { les_prescription_item: true },
    });

    if (medications) {
      try {
        await this.generateRoutinesForMedications(
          prescription.patient_id,
          prescription.prescribed_date,
          medications,
          prescription.id,
        );
      } catch (e) {
        console.error('Failed to generate routines on update', e);
      }
    }

    return prescription;
  }

  async remove(id: string) {
    const prescription = await this.findOne(id);

    await this.prisma.les_user_routine.deleteMany({
      where: {
        user_id: prescription.patient_id,
        description: {
          contains: `[Ref: ${id}]`,
        },
      },
    });

    return this.prisma.les_user_prescription.delete({
      where: { id },
    });
  }

  // Prescription Items CRUD
  async addItem(prescriptionId: string, data: any) {
    await this.findOne(prescriptionId);
    return this.prisma.les_prescription_item.create({
      data: { ...data, prescription_id: prescriptionId },
    });
  }

  async removeItem(itemId: string) {
    const item = await this.prisma.les_prescription_item.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundException(`Item with ID ${itemId} not found`);
    return this.prisma.les_prescription_item.delete({ where: { id: itemId } });
  }
}
