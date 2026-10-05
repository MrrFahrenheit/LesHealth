import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPrescriptionDto: CreatePrescriptionDto, patient_id: string) {
    try {
      const { doctor_id, description, prescribed_date, medications } = createPrescriptionDto;
      
      const prescription = await this.prismaService.les_user_prescription.create({
        data: {
          description,
          prescribed_date,
          les_user_les_user_prescription_patient_idToles_user: {
            connect: { id: patient_id }
          },
          les_user_les_user_prescription_doctor_idToles_user: {
            connect: { id: doctor_id }
          },
          ...(medications && medications.length > 0 && {
            les_prescription_item: {
              create: medications.map(med => ({
                medication_name: med.medication_name,
                dosage: med.dosage,
                frequency: med.frequency,
                duration_days: med.duration_days,
                notes: med.notes
              }))
            }
          })
        },
        include: { les_prescription_item: true }
      });

      if (medications && medications.length > 0) {
        for (const med of medications) {
          const routine = await this.prismaService.les_user_routine.create({
            data: {
              user_id: patient_id,
              title: med.medication_name,
              description: `Dosis: ${med.dosage}. Notas: ${med.notes || ''}`,
              frequency: med.frequency,
            }
          });

          let hoursInterval = 24;
          const match = med.frequency.match(/cada\s+(\d+)\s+hora/i);
          if (match && match[1]) {
            hoursInterval = parseInt(match[1]);
          }

          const durationDays = med.duration_days || 7;
          const eventsData = [];
          const startDate = new Date();
          
          const totalEvents = Math.floor((24 / hoursInterval) * durationDays);
          for(let i = 0; i < totalEvents; i++) {
             const scheduledFor = new Date(startDate.getTime() + (i * hoursInterval * 60 * 60 * 1000));
             eventsData.push({
               routine_id: routine.id,
               title: med.medication_name,
               description: med.dosage,
               event_type: 'medication' as const,
               scheduled_for: scheduledFor
             });
          }

          if (eventsData.length > 0) {
            await this.prismaService.les_routine_event.createMany({
              data: eventsData
            });
          }
        }
      }

      return prescription;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear la receta');
    }
  }

  async findAllByPatient(patientId: string) {
    try {
      return await this.prismaService.les_user_prescription.findMany({
        where: { patient_id: patientId },
        include: {
          les_user_les_user_prescription_doctor_idToles_user: {
            select: { full_name: true, specialty: true }
          },
          les_prescription_item: true
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las recetas del paciente');
    }
  }

  async findAllByDoctor(doctorId: string) {
    try {
      return await this.prismaService.les_user_prescription.findMany({
        where: { doctor_id: doctorId },
        include: {
          les_user_les_user_prescription_patient_idToles_user: {
            select: { full_name: true, email: true }
          }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las recetas del doctor');
    }
  }

  async findOne(id: string) {
    try {
      const prescription = await this.prismaService.les_user_prescription.findUnique({
        where: { id },
      });

      if (!prescription) {
        throw new NotFoundException(`Receta con ID ${id} no encontrada`);
      }

      return prescription;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener la receta');
    }
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    try {
      await this.findOne(id);
      
      const updateData: any = {};
      if (updatePrescriptionDto.description) updateData.description = updatePrescriptionDto.description;
      if (updatePrescriptionDto.prescribed_date) updateData.prescribed_date = updatePrescriptionDto.prescribed_date;

      return await this.prismaService.les_user_prescription.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar la receta');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.prismaService.les_user_prescription.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al eliminar la receta');
    }
  }
}
