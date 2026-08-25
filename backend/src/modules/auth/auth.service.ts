import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { comparePassword, hashPassword } from "src/common/helpers/hash";
import { PrismaService } from "src/core/database/prisma.service";
import { SesionService } from "../sesion/sesion.service";
import { AuthCreateUserDto } from "./dto/auth-create-user-dto";
import { AuthLoginUserDto } from "./dto/auth-login-user-dto";

@Injectable()

export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly sesionService: SesionService) { };

    async create(authCreateUserDto: AuthCreateUserDto) {
        try {
            const hashedPassWord = await hashPassword(authCreateUserDto.password);
            const { password, ...userData } = authCreateUserDto;

            const result = await this.prismaService.les_user.create({
                data: {
                    ...userData,
                    password_hash: hashedPassWord
                }
            })

            const sesion = await this.sesionService.create(result.id);

            return {
                id: result.id,
                email: result.email,
                fullName: result.full_name,
                sesionCreated: sesion
            }

        } catch (error) {
            console.log(error)
            // P2002 es el código de error de Prisma para "Unique constraint failed"
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('El correo electrónico ya está registrado.');
            }

            throw new InternalServerErrorException('Error al crear el usuario');
        }
    }

    async login(authLoginUserDto: AuthLoginUserDto) {
        try {
            const result = await this.prismaService.les_user.findUnique({
                where: {
                    email: authLoginUserDto.email
                }
            });

            if (!result) {
                throw new UnauthorizedException("Credenciales Incorrectas");
            }

            const isValidPassword = await comparePassword(authLoginUserDto.password, result.password_hash);

            if (!isValidPassword) {
                throw new UnauthorizedException("Credenciales incorrectas.");
            }

            const sesion = await this.sesionService.create(result.id);

            return {
                id: result.id,
                email: result.email,
                fullName: result.full_name,
                sesionCreated: sesion
            }

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al iniciar sesión');
        }
    }
}