import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/core/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService], // Exportamos para que otros módulos (Community, Routine) puedan lanzar notificaciones
})
export class NotificationModule {}

