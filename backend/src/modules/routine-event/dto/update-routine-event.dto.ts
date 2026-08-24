import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineEventDto } from './create-routine-event.dto';

export class UpdateRoutineEventDto extends PartialType(CreateRoutineEventDto) {
    completed_at?: string;
}

