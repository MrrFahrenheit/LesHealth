import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SesionModule } from './modules/sesion/sesion.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './core/database/prisma.module';

@Module({
  imports: [UserModule, SesionModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
