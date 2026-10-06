import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  // 2. Buscar usuario por Email (Crucial para el AuthService / Login)
  async findByEmail(email: string) {
    return this.prismaService.les_user.findUnique({
      where: { email },
    });
  }

  // 3. Obtener perfil completo del usuario por ID
  async getUserProfile(id: string) {
    const user = await this.prismaService.les_user.findUnique({
      where: { id },
      include: {
        les_user_medical_info: true, // Trae su info médica si es paciente
        les_doctor_profile: true,    // Trae su perfil si es doctor
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 4. Listar solo a los doctores (Útil para que los pacientes agenden citas)
  async getDoctors() {
    return this.prismaService.les_user.findMany({
      where: {
        role: 'doctor',
      },
      select: {
        id: true,
        email: true,
        full_name: true,

        // JOIN a la relación de perfil del doctor
        les_doctor_profile: true,
      },
    })
  }

  // Obtener los pacientes de un doctor
  async getMyPatients(doctorId: string) {
    return this.prismaService.les_user.findMany({
      where: {
        OR: [
          { les_user_prescription_les_user_prescription_patient_idToles_user: { some: { doctor_id: doctorId } } },
          { les_user_reservation_les_user_reservation_patient_idToles_user: { some: { doctor_id: doctorId } } }
        ]
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        avatar_url: true,
        les_user_medical_info: true,
      }
    });
  }

  // 5. Crear o Actualizar la información médica (Upsert)
  async upsertMedicalInfo(
    patientId: string,
    data: Omit<Prisma.les_user_medical_infoCreateInput, 'les_user'>
  ) {
    // Verificamos que el usuario exista
    await this.getUserProfile(patientId);

    try {
      return await this.prismaService.les_user_medical_info.upsert({
        where: {
          patient_id: patientId,
        },
        update: data,
        create: {
          ...data,
          les_user: { connect: { id: patientId } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la información médica');
    }
  }

  // 6. Actualizar usuario (Perfil general)
  async updateUser(id: string, data: Prisma.les_userUpdateInput) {
    try {
      const updatedUser = await this.prismaService.les_user.update({
        where: { id },
        data,
      });
      const { password_hash, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException(`No se pudo actualizar: Usuario con ID ${id} no existe`);
    }
  }

  // 7. Eliminar usuario (Y por CASCADE en la DB se lleva rutinas, citas, etc.)
  async deleteUser(id: string) {
    try {
      return await this.prismaService.les_user.delete({
        where: { id },
        select: { id: true, email: true },
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo eliminar: Usuario con ID ${id} no existe`);
    }
  }

  // 8. Enviar verificación de especialista
  async submitSpecialistVerification(userId: string, frontUrl: string, backUrl: string) {
    const request = await this.prismaService.les_verification_request.upsert({
      where: { user_id: userId },
      update: {
        license_front_url: frontUrl,
        license_back_url: backUrl,
        status: 'pending',
      },
      create: {
        user_id: userId,
        license_front_url: frontUrl,
        license_back_url: backUrl,
        status: 'pending',
      },
    });

    return { message: 'Verification submitted successfully', request };
  }

  // 9. Aprobar especialista (Admin only - ideally protected by admin guard)
  async approveSpecialist(userId: string) {
    // 1. Marcar la solicitud como aprobada
    await this.prismaService.les_verification_request.updateMany({
      where: { user_id: userId, status: 'pending' },
      data: { status: 'approved' },
    });

    // 2. Actualizar el rol del usuario
    const user = await this.prismaService.les_user.update({
      where: { id: userId },
      data: {
        is_verified_doctor: true,
        role: 'doctor', // Asumimos que al verificar se vuelve doctor
      },
    });

    // 3. Crear el perfil de doctor automáticamente
    await this.prismaService.les_doctor_profile.upsert({
      where: { user_id: userId },
      update: {},
      create: {
        user_id: userId,
        name: user.full_name,
        specialty: user.specialty || 'General',
        location: 'Ubicación no especificada',
        image_url: user.avatar_url,
      },
    });

    return { message: 'Specialist approved successfully', user: { id: user.id, is_verified_doctor: user.is_verified_doctor } };
  }
}