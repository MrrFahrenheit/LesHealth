import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineEventDto } from './create-routine-event.dto';
import { IsDateString, IsOptional, ValidateIf } from 'class-validator';

export class UpdateRoutineEventDto extends PartialType(CreateRoutineEventDto) {
    @IsOptional()
    @ValidateIf((object, value) => value !== null)
    @IsDateString()
    completed_at?: string | null;
}

