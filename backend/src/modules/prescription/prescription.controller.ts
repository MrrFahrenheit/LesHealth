import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { LesUserResponseDto } from 'src/common/dto/les-user-dto';

@Controller('prescription')
@UseGuards(SesionGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  create(@CurrentUser() user: LesUserResponseDto, @Body() createPrescriptionDto: any) {
    if (!createPrescriptionDto.patient_id) {
        createPrescriptionDto.patient_id = user.id;
    }
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get('patient')
  findByPatient(@CurrentUser() user: LesUserResponseDto) {
    return this.prescriptionService.findByPatient(user.id);
  }

  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: any) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }

  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() data: any) {
    return this.prescriptionService.addItem(id, data);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.prescriptionService.removeItem(itemId);
  }
}
