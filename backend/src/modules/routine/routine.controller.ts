import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CheckOwner } from 'src/common/decorators/check-owner-decorator';
import { EmailVerifiedGuard } from 'src/common/guards/email-verified.guard';

@Controller('routine')
@UseGuards(SesionGuard, EmailVerifiedGuard)
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createRoutineDto: CreateRoutineDto) {
    return this.routineService.create(userId, createRoutineDto);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.routineService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routineService.findOne(id);
  }

  @Patch(':id')
  @CheckOwner({ source: 'body', fieldPath: 'patient_id' })
  update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routineService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  @CheckOwner({ source: 'body', fieldPath: 'patient_id' })
  remove(@Param('id') id: string) {
    return this.routineService.remove(id);
  }
}
