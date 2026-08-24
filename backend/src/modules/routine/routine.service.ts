import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createRoutineDto: CreateRoutineDto) {
    try {
      return await this.prismaService.les_user_routine.create({
        data: {
          ...createRoutineDto,
          les_user: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la rutina');
    }
  }

  async findAllByUser(userId: string) {
    try {
      return await this.prismaService.les_user_routine.findMany({
        where: { user_id: userId },
        include: { les_routine_event: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las rutinas');
    }
  }

  async findOne(id: string) {
    try {
      const routine = await this.prismaService.les_user_routine.findUnique({
        where: { id },
        include: { les_routine_event: true },
      });

      if (!routine) {
        throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
      }

      return routine;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener la rutina');
    }
  }

  async update(id: string, updateRoutineDto: UpdateRoutineDto) {
    try {
      // Validar si existe primero
      await this.findOne(id);
      
      return await this.prismaService.les_user_routine.update({
        where: { id },
        data: updateRoutineDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar la rutina');
    }
  }

  async remove(id: string) {
    try {
      // Validar si existe
      await this.findOne(id);

      return await this.prismaService.les_user_routine.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al eliminar la rutina');
    }
  }
}
