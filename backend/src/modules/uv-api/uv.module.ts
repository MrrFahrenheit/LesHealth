import { Module } from "@nestjs/common";
import { UvController } from "./uv.controller";
import { UvService } from "./uv.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    controllers:[UvController],
    providers:[UvService],
    exports:[UvService],
    imports:[HttpModule]
})

export class UvModule {};