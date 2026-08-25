import { routine_type } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateRoutineEventDto {
    @IsString()
    routine_id!: string;

    @IsString()
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(routine_type)
    event_type!: routine_type;

    @IsBoolean()
    @IsOptional()
    is_pending?: boolean;

    @IsDateString()
    @IsOptional()
    scheduled_for?: string;
}

