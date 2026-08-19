import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SesionModule } from './modules/sesion/sesion.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './core/database/prisma.module';
import { UvModule } from './modules/uv-api/uv.module';

@Module({
  imports: [UserModule, SesionModule, AuthModule, PrismaModule, UvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
