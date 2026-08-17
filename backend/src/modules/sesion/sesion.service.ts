import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { SignJWT } from "jose";
import { Prisma } from "@prisma/client";

@Injectable()

export class SesionService {
    constructor(private readonly prismaService: PrismaService) { };

    private readonly SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "tu_clave_secreta_muy_larga");

    private async CreateSesionToken(userId: string) {
        return await new SignJWT({ userId })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h") // El token dura 24 horas
            .sign(this.SECRET);
    }

    async create(userId:string) {
        try {
            const sesionToken = await this.CreateSesionToken(userId);

            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            const createdSesion = await this.prismaService.les_sesion.create({
                data: {
                    refresh_token:sesionToken,
                    expires_at:expiresAt,
                    les_user:{
                        connect:{
                            id:userId
                        }
                    }
                }
            })

            return createdSesion;
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el usuario');
        }
    }
}