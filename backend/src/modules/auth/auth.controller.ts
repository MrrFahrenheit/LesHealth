import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { CurrentUser } from "src/common/decorators/current-user-decorator";
import { LesUserResponseDto } from "src/common/dto/les-user-dto";
import { SesionGuard } from "src/common/guards/sesion.guard";
import { addCookie } from "src/common/helpers/cookies";
import { AuthService } from "./auth.service";
import { AuthCreateUserDto } from "./dto/auth-create-user-dto";
import { AuthLoginUserDto } from "./dto/auth-login-user-dto";

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @Post('verify-email')
    @UseGuards(SesionGuard)
    @HttpCode(HttpStatus.OK)
    async verifyEmail(@CurrentUser() user: LesUserResponseDto, @Body('otp') otp: string) {
        return await this.authService.verifyEmail(user.id, otp);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() authCreateUserDto: AuthCreateUserDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.create(authCreateUserDto);

        addCookie(response, "sesion_token", result.sesionCreated.refresh_token);

        return result;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() authLoginUserDto: AuthLoginUserDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.login(authLoginUserDto);

        addCookie(response, "sesion_token", result.sesionCreated.refresh_token);

        return result;
    }

    @Get('me')
    @UseGuards(SesionGuard)
    getMe(@CurrentUser() user: LesUserResponseDto) {
        const { id, ...userWithoutId } = user;
        return userWithoutId;
    }

    @Post('logout')
    @UseGuards(SesionGuard)
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req: any, @Res({ passthrough: true }) response: Response) {
        if (req.sesionId) {
            await this.authService.logout(req.sesionId);
        }
        response.clearCookie('sesion_token', { httpOnly: true, sameSite: 'lax', path: '/' });

        return { message: "Sesión cerrada con éxito" };
    }
}