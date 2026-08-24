import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePrescriptionDto {
    @IsString()
    patient_id: string;

    @IsString()
    doctor_id: string;

    @IsString()
    description: string;

    @IsDateString()
    @IsOptional()
    prescribed_date?: string;
}

