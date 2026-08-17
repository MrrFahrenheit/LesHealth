import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { SesionService } from "./sesion.service";
import type { Response } from "express";
import { addCookie } from "src/common/helpers/cookies";
import { SesionGuard } from "src/common/guards/sesion.guard";
import { CurrentUser } from "src/common/decorators/current-user-decorator";
import { LesUserResponseDto } from "src/common/dto/les-user-dto";

@Controller('sesion')
export class SesionController {
    constructor(private readonly sesionService: SesionService) { };

    @Post()
    async create(@Body() user_id: string, @Res({ passthrough: true }) response: Response) {
        const result = await this.sesionService.create(user_id);
        addCookie(response, "sesion_token", result.refresh_token);

        return result;
    }

    @Get('me')
    @UseGuards(SesionGuard)
    getProfile(@CurrentUser() user: LesUserResponseDto){
        return user;
    }
}