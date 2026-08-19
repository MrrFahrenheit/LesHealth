import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthCreateUserDto } from "./dto/auth-create-user-dto";
import { AuthService } from "./auth.service";
import { AuthLoginUserDto } from "./dto/auth-login-user-dto";
import { SesionService } from "../sesion/sesion.service";
import type { Response } from "express";
import { addCookie } from "src/common/helpers/cookies";
import { SesionGuard } from "src/common/guards/sesion.guard";
import { CurrentUser } from "src/common/decorators/current-user-decorator";
import { LesUserResponseDto } from "src/common/dto/les-user-dto";

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() authCreateUserDto: AuthCreateUserDto, @Res({ passthrough: true }) response: Response) {
        console.log(authCreateUserDto)
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
        console.log(user)
        return user;
    }

}