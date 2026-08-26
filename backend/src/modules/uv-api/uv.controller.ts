import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { UvService } from "./uv.service";
import { SesionGuard } from "src/common/guards/sesion.guard";

@Controller('uv')
@UseGuards(SesionGuard)
export class UvController {
    constructor(private readonly uvService: UvService) { }

    @Get()
    async getUv(
        @Query("lat") lat: string,
        @Query("lon") lon: string,
    ) {
        return this.uvService.getUv(
            Number(lat),
            Number(lon),
        );
    }
}