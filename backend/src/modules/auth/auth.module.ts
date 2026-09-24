import { Module } from "@nestjs/common";
import { SesionService } from "../sesion/sesion.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MailService } from "./mail.service";

@Module({
    controllers:[AuthController],
    providers:[AuthService, SesionService, MailService],
    exports:[AuthService]
})

export class AuthModule {}