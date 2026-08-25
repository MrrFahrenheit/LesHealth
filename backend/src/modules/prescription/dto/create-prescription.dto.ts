import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePrescriptionDto {
    // patient_id is injected via the token in the controller

    @IsString()
    doctor_id: string;

    @IsString()
    description: string;

    @IsDateString()
    @IsOptional()
    prescribed_date?: string;
}

