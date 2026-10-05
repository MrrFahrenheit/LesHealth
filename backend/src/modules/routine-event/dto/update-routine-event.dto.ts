import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineEventDto } from './create-routine-event.dto';
import { IsDateString, IsOptional, ValidateIf } from 'class-validator';

export class UpdateRoutineEventDto extends PartialType(CreateRoutineEventDto) {
    @ValidateIf((o) => o.completed_at !== null)
    @IsDateString()
    @IsOptional()
    completed_at?: string | null;
}

