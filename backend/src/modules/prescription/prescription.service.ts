import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPrescriptionDto: CreatePrescriptionDto, patient_id: string) {
    try {
      const { doctor_id, description, prescribed_date } = createPrescriptionDto;
      return await this.prismaService.les_user_prescription.create({
        data: {
          description,
          prescribed_date,
          les_user_les_user_prescription_patient_idToles_user: {
            connect: { id: patient_id }
          },
          les_user_les_user_prescription_doctor_idToles_user: {
            connect: { id: doctor_id }
          }
        },
      });
    } catch (error) {
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
          }
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
