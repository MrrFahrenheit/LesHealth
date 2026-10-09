import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async create(createReservationDto: CreateReservationDto, patient_id: string) {
    try {
      const { doctor_id, reservation_date, notes } = createReservationDto;
      /*
      const isAlredyDoctorAsigned = await this.prismaService.les_user_reservation.findFirst({
        where: {
          doctor_id,
          patient_id,
          reservation_date: new Date(reservation_date)
        }
      });

      if(!isAlredyDoctorAsigned){
        await this.prismaService.les_doctor_profile.update({})
      }
      */
      const reservation = await this.prismaService.les_user_reservation.create({
        data: {
          reservation_date,
          notes,
          les_user_les_user_reservation_patient_idToles_user: {
            connect: { id: patient_id }
          },
          les_user_les_user_reservation_doctor_idToles_user: {
            connect: { id: doctor_id }
          }
        },
      });

      // Obtener nombre del paciente para la notificación
      const patient = await this.prismaService.les_user.findUnique({
        where: { id: patient_id },
        select: { full_name: true }
      });

      if (patient) {
        await this.notificationService.createNotification(
          doctor_id,
          'Nueva Cita Médica',
          `${patient.full_name} ha agendado una cita para el ${new Date(reservation_date).toLocaleDateString()}.`,
          'RESERVATION',
          '/les/reservations'
        );
      }

      return reservation;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la cita/reserva');
    }
  }

  async findAllByPatient(patientId: string) {
    try {
      return await this.prismaService.les_user_reservation.findMany({
        where: { patient_id: patientId },
        include: {
          les_user_les_user_reservation_doctor_idToles_user: {
            select: { full_name: true, specialty: true }
          }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las reservas del paciente');
    }
  }

  async findAllByDoctor(doctorId: string) {
    try {
      return await this.prismaService.les_user_reservation.findMany({
        where: { doctor_id: doctorId },
        include: {
          les_user_les_user_reservation_patient_idToles_user: {
            select: { full_name: true, email: true }
          }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las reservas del doctor');
    }
  }

  async findOne(id: string) {
    try {
      const reservation = await this.prismaService.les_user_reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new NotFoundException(`Reserva/Cita con ID ${id} no encontrada`);
      }

      return reservation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener la reserva');
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    try {
      await this.findOne(id);
      
      const updateData: any = {};
      if (updateReservationDto.reservation_date) updateData.reservation_date = updateReservationDto.reservation_date;
      if (updateReservationDto.status) updateData.status = updateReservationDto.status;
      if (updateReservationDto.notes) updateData.notes = updateReservationDto.notes;

      return await this.prismaService.les_user_reservation.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar la reserva');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.prismaService.les_user_reservation.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al eliminar la reserva');
    }
  }
}
