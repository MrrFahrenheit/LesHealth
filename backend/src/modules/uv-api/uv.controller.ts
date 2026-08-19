import { Controller, Get, Query } from "@nestjs/common";
import { UvService } from "./uv.service";

@Controller('uv')

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