import { Body, Controller, Delete, Get, Post, Query, UnauthorizedException, UseGuards } from "@nestjs/common";
import { SignService } from "./sign.service";
import { SesionGuard } from "src/common/guards/sesion.guard";
import { CurrentUser } from "src/common/decorators/current-user-decorator";
import { LesUserResponseDto } from "src/common/dto/les-user-dto";
import { CreateSignDto } from "./dto/create-sign-dto";
import { UpdateSignDto } from "./dto/update-sign-dto";
import { DeleteSignDto } from "./dto/delete-sign-dto";

@Controller("sign")
export class SignController {
    constructor(private readonly signService: SignService) { }

    @Post()
    @UseGuards(SesionGuard)
    async create(@CurrentUser() user: LesUserResponseDto, @Body() createSignDto: CreateSignDto) {
        console.log(user)
        const result = await this.signService.create(createSignDto, user.id);

        return result;
    }

    @Get()
    @UseGuards(SesionGuard)
    async getUserSignsByType(@CurrentUser() user: LesUserResponseDto, @Query(":type") type: string) {
        const signs = await this.signService.getUserSignsBySign(user.id, type);

        return signs
    }

    @Get('all')
    @UseGuards(SesionGuard)
    async getAllUserSigns(@CurrentUser() user: LesUserResponseDto) {
        return await this.signService.getAllUserSigns(user.id);
    }

    @Delete()
    @UseGuards(SesionGuard)
    async deleteUserSign(@CurrentUser() user: LesUserResponseDto, @Body() deleteSignDto: DeleteSignDto) {
        if (user.id !== deleteSignDto.user_id) {
            return new UnauthorizedException("");
        }
        const result = await this.signService.deleteSign(deleteSignDto.id);

        return result;
    }

    @Post()
    @UseGuards(SesionGuard)
    async updateUserSign(@CurrentUser() user: LesUserResponseDto, @Body() updateUserSignDto: UpdateSignDto) {
        if (user.id !== updateUserSignDto.user_id) {
            return new UnauthorizedException("");
        }
        const result = await this.signService.updateSign(updateUserSignDto);

        return result;
    }
}