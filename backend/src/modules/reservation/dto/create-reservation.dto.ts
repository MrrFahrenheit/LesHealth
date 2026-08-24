import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
    @IsString()
    patient_id: string;

    @IsString()
    doctor_id: string;

    @IsDateString()
    reservation_date: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    notes?: string;
}

