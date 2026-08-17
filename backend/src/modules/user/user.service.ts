import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { Prisma, user_role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
        role: 'doctor', // Usa el Enum generado por Prisma
      },
      select: {
        id: true,
        full_name: true,
        specialty: true,
        license_number: true,
      },
    });
  }

  // 5. Crear o Actualizar la información médica (Upsert)
  async upsertMedicalInfo(
    patientId: string, 
    data: Omit<Prisma.les_user_medical_infoCreateInput, 'les_user'>
  ) {
    // Verificamos que el usuario exista
    await this.getUserProfile(patientId);

    return this.prismaService.les_user_medical_info.upsert({
      where: {
        patient_id: patientId,
      },
      update: data,
      create: {
        ...data,
        les_user: { connect: { id: patientId } },
      },
    });
  }

  // 6. Eliminar usuario (Y por CASCADE en la DB se lleva rutinas, citas, etc.)
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
}