import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionService } from './prescription.service';

import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { LesUserResponseDto } from 'src/common/dto/les-user-dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @UseGuards(SesionGuard)
  create(@Body() createPrescriptionDto: CreatePrescriptionDto, @CurrentUser() user: any) {
    return this.prescriptionService.create(createPrescriptionDto, user.id);
  }

  @Get('patient')
  @UseGuards(SesionGuard)
  findAllByPatient(@CurrentUser() user:LesUserResponseDto) {
    return this.prescriptionService.findAllByPatient(user.id);
  }

  @Get('doctor/:doctorId')
  findAllByDoctor(@Param('doctorId') doctorId: string) {
    return this.prescriptionService.findAllByDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
