import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService], // Exportamos para que otros módulos (Community, Routine) puedan lanzar notificaciones
})
export class NotificationModule {}
