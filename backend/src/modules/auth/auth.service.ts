import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { comparePassword, hashPassword } from "src/common/helpers/hash";
import { PrismaService } from "src/core/database/prisma.service";
import { SesionService } from "../sesion/sesion.service";
import { AuthCreateUserDto } from "./dto/auth-create-user-dto";
import { AuthLoginUserDto } from "./dto/auth-login-user-dto";
import { MailService } from "./mail.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly sesionService: SesionService,
        private readonly mailService: MailService
    ) { };

    async sendVerificationCode(email: string) {
        // Obsoleto: Ya no generamos el código antes de crear la cuenta.
        // Se mantiene la firma por si otras partes del código lo usan temporalmente,
        // pero la creación de cuenta debe usarse directamente.
        throw new BadRequestException('Por favor, regístrese directamente.');
    }

    async create(authCreateUserDto: AuthCreateUserDto) {
        try {
            const hashedPassWord = await hashPassword(authCreateUserDto.password);
            // Ya no desestructuramos "otp" porque no debe existir en el DTO
            const { password, ...userData } = authCreateUserDto;

            // Generar código de 6 dígitos
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Expiración: 24 horas a partir de ahora (Garantizando precisión, no 00:00)
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

            const result = await this.prismaService.les_user.create({
                data: {
                    ...userData,
                    password_hash: hashedPassWord,
                    isemailverified: false,
                    verification_token: verificationToken,
                    verification_expires: expiresAt
                }
            });

            // Enviar correo asíncronamente con el token (usualmente como un enlace)
            this.mailService.sendVerificationEmail(result.email, verificationToken).catch(err => console.error(err));

            const sesion = await this.sesionService.create(result.id);

            return {
                id: result.id,
                email: result.email,
                fullName: result.full_name,
                sesionCreated: sesion
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('El correo electrónico ya está registrado.');
            }
            throw new InternalServerErrorException('Error al crear el usuario');
        }
    }
    

    async verifyEmail(userId: string, code: string) {
        const user = await this.prismaService.les_user.findUnique({ where: { id: userId } });

        if (!user) throw new UnauthorizedException('Usuario no encontrado');
        if (user.isemailverified) throw new BadRequestException('El correo ya está verificado');

        if (user.verification_token !== code) {
            throw new BadRequestException('Código inválido');
        }

        if (user.verification_expires && new Date() > user.verification_expires) {
            throw new BadRequestException('El código ha expirado');
        }

        await this.prismaService.les_user.update({
            where: { id: userId },
            data: {
                isemailverified: true,
                verification_token: null,
                verification_expires: null
            }
        });

        return { message: 'Correo verificado con éxito' };
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

    async logout(sesionId: string) {
        if (!sesionId) return;
        await this.prismaService.les_sesion.update({
            where: { id: sesionId },
            data: { is_revoked: true }
        });
    }
}