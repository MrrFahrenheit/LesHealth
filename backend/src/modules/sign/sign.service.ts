import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateSignDto } from "./dto/create-sign-dto";

@Injectable()

export class SignService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createSignDto:CreateSignDto){
        const result = await this.prismaService.les_user_sign.create({
            data:{
                ...createSignDto
            }
        })

        return result;
    }
}