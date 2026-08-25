import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
    // patient_id is injected via the token in the controller

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

