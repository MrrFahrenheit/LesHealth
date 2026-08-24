import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateRoutineEventDto } from './dto/create-routine-event.dto';
import { UpdateRoutineEventDto } from './dto/update-routine-event.dto';

@Injectable()
export class RoutineEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoutineEventDto: CreateRoutineEventDto) {
    try {
      return await this.prismaService.les_routine_event.create({
        data: createRoutineEventDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el evento de rutina');
    }
  }

  async findAllByRoutine(routineId: string) {
    try {
      return await this.prismaService.les_routine_event.findMany({
        where: { routine_id: routineId },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los eventos');
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.prismaService.les_routine_event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new NotFoundException(`Evento con ID ${id} no encontrado`);
      }

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener el evento');
    }
  }

  async update(id: string, updateRoutineEventDto: UpdateRoutineEventDto) {
    try {
      await this.findOne(id);
      
      return await this.prismaService.les_routine_event.update({
        where: { id },
        data: updateRoutineEventDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar el evento');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.prismaService.les_routine_event.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al eliminar el evento');
    }
  }
}
