import { Module } from '@nestjs/common';
import { RoutineEventController } from './routine-event.controller';
import { RoutineEventService } from './routine-event.service';

@Module({
  controllers: [RoutineEventController],
  providers: [RoutineEventService]
})
export class RoutineEventModule {}
