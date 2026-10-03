import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user-decorator";
import { LesUserResponseDto } from "src/common/dto/les-user-dto";
import { SesionGuard } from "src/common/guards/sesion.guard";
import { UserService } from "./user.service";

@Controller('user')

export class UserController{
    constructor(private readonly userService: UserService) {}

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

    @Patch()
    @UseGuards(SesionGuard)
    async updateCurrentUser(@CurrentUser() user: LesUserResponseDto, @Body() body: any) {
        // Permitimos actualizar nombre y avatar
        const updateData: any = {};
        if (body.full_name) updateData.full_name = body.full_name;
        if (body.avatar_url) updateData.avatar_url = body.avatar_url;

        return await this.userService.updateUser(user.id, updateData);
    }
}