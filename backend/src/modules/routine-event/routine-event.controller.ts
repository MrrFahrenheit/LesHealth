import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoutineEventService } from './routine-event.service';
import { CreateRoutineEventDto } from './dto/create-routine-event.dto';
import { UpdateRoutineEventDto } from './dto/update-routine-event.dto';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CheckOwner } from 'src/common/decorators/check-owner-decorator';

@Controller('routine-event')
@UseGuards(SesionGuard)
export class RoutineEventController {
  constructor(private readonly routineEventService: RoutineEventService) {}

  @Post()
  create(@Body() createRoutineEventDto: CreateRoutineEventDto) {
    return this.routineEventService.create(createRoutineEventDto);
  }

  @Get('routine/:routineId')
  findAllByRoutine(@Param('routineId') routineId: string) {
    return this.routineEventService.findAllByRoutine(routineId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routineEventService.findOne(id);
  }

  @Patch(':id')
  @CheckOwner({ source: 'body', fieldPath: 'patient_id' })
  update(@Param('id') id: string, @Body() updateRoutineEventDto: UpdateRoutineEventDto) {
    return this.routineEventService.update(id, updateRoutineEventDto);
  }

  @Delete(':id')
  @CheckOwner({ source: 'body', fieldPath: 'patient_id' })
  remove(@Param('id') id: string) {
    return this.routineEventService.remove(id);
  }
}
