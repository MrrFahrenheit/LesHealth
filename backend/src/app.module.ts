import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SesionModule } from './modules/sesion/sesion.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './core/database/prisma.module';
import { UvModule } from './modules/uv-api/uv.module';
import { SignModule } from './modules/sign/sign.module';
import { RoutineModule } from './modules/routine/routine.module';
import { RoutineEventModule } from './modules/routine-event/routine-event.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [UserModule, SesionModule, AuthModule, PrismaModule, UvModule, SignModule, RoutineModule, RoutineEventModule, PrescriptionModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
