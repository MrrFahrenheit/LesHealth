import { IsDateString, IsOptional, IsString, ValidateNested, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PrescriptionItemDto {
    @IsString()
    medication_name: string;

    @IsString()
    dosage: string;

    @IsString()
    frequency: string;

    @IsInt()
    @IsOptional()
    duration_days?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}

export class CreatePrescriptionDto {
    @IsString()
    @IsOptional()
    doctor_id?: string;

    @IsString()
    @IsOptional()
    patient_id?: string;

    @IsString()
    description: string;

    @IsDateString()
    @IsOptional()
    prescribed_date?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PrescriptionItemDto)
    @IsOptional()
    medications?: PrescriptionItemDto[];
}

