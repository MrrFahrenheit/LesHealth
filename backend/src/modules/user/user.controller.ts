import { Controller, Get, Param, UseGuards } from "@nestjs/common";
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
}