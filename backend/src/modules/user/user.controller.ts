import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user-decorator";
import { LesUserResponseDto } from "src/common/dto/les-user-dto";
import { SesionGuard } from "src/common/guards/sesion.guard";
import { UserService } from "./user.service";

@Controller('user')

export class UserController{
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('doctors')
    @UseGuards(SesionGuard)
    async getDoctors(@CurrentUser() user:LesUserResponseDto){
        const doctors = await this.userService.getDoctors();

        return doctors;
    }

    @Get(':id')
    @UseGuards(SesionGuard)
    async getUserProfile(@Param('id') id: string) {
        return await this.userService.getUserProfile(id);
    }

    @Get('my-patients')
    @UseGuards(SesionGuard)
    async getMyPatients(@CurrentUser() user:LesUserResponseDto){
        if (user.role !== 'doctor') {
            const { ForbiddenException } = require('@nestjs/common');
            throw new ForbiddenException('Solo los doctores pueden ver a sus pacientes');
        }
        return await this.userService.getMyPatients(user.id);
    }

    @Patch()
    @UseGuards(SesionGuard)
    async updateCurrentUser(@CurrentUser() user: LesUserResponseDto, @Body() body: any) {
        // Permitimos actualizar nombre y avatar
        const updateData: any = {};
        if (body.full_name) updateData.full_name = body.full_name;
        if (body.avatar_url) updateData.avatar_url = body.avatar_url;

        return await this.userService.updateUser(user.id, updateData);
    }


    @Post('submit-verification')
    @UseGuards(SesionGuard)
    async submitVerification(
        @CurrentUser() user: LesUserResponseDto,
        @Body() body: { license_front_url: string; license_back_url: string }
    ) {
        return await this.userService.submitSpecialistVerification(
            user.id,
            body.license_front_url,
            body.license_back_url
        );
    }

    @Patch('approve-specialist/:id')
    async approveSpecialist(@Param('id') id: string) {
        // En una app real, esto debería estar protegido por un AdminGuard
        return await this.userService.approveSpecialist(id);
    }
}