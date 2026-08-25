import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservation.service';
import { LesUserResponseDto } from 'src/common/dto/les-user-dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(SesionGuard)
  create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user: LesUserResponseDto) {
    return this.reservationService.create(createReservationDto, user.id);
  }

  @Get('patient')
  @UseGuards(SesionGuard)
  findAllByPatient(@CurrentUser() user:LesUserResponseDto) {
    return this.reservationService.findAllByPatient(user.id);
  }

  @Get('doctor/:doctorId')
  findAllByDoctor(@Param('doctorId') doctorId: string) {
    return this.reservationService.findAllByDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
