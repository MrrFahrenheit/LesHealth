import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SesionService } from "../sesion/sesion.service";

@Module({
    controllers:[AuthController],
    providers:[AuthService, SesionService],
    exports:[AuthService]
})

export class AuthModule {}