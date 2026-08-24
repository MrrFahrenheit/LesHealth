import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateSignDto } from "./dto/create-sign-dto";
import { UpdateSignDto } from "./dto/update-sign-dto";

@Injectable()

export class SignService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createSignDto: CreateSignDto, userId: string) {
        const result = await this.prismaService.les_user_sign.create({
            data: {
                ...createSignDto,
                les_user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return result;
    }

    async getUserSignsBySign(userId: string, signType: string) {
        const list = await this.prismaService.les_user_sign.findMany({
            where: {
                patient_id: userId,
                type: signType
            }
        })

        return list;
    }

    async getAllUserSigns(userId: string) {
        const list = await this.prismaService.les_user_sign.findMany({
            where: {
                patient_id: userId,
            },
        });

        const grouped = list.reduce((acc, item) => {
            const key = item.type;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as Record<string, typeof list>);

        return grouped;
    }

    async deleteSign(signId: string) {
        const result = await this.prismaService.les_user_sign.delete({ where: { id: signId }});

        return result;
    }

    async updateSign(updateSignDto:UpdateSignDto){
        const result = await this.prismaService.les_user_sign.update({where:{
            id:updateSignDto.id
        }, data:{
            type:updateSignDto.type,
            value:updateSignDto.value
        }});

        return result;
    }
}