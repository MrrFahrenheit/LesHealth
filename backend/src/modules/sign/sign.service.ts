import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateSignDto } from "./dto/create-sign-dto";
import { UpdateSignDto } from "./dto/update-sign-dto";

@Injectable()
export class SignService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createSignDto: CreateSignDto, userId: string) {
        try {
            const { type, value } = createSignDto;
            const result = await this.prismaService.les_user_sign.create({
                data: {
                    type,
                    value,
                    les_user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error creating sign');
        }
    }

    async getUserSignsBySign(userId: string, signType: string) {
        try {
            const list = await this.prismaService.les_user_sign.findMany({
                where: {
                    patient_id: userId,
                    type: signType
                }
            });
            return list;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching user signs');
        }
    }

    async getAllUserSigns(userId: string) {
        try {
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
        } catch (error) {
            throw new InternalServerErrorException('Error fetching all user signs');
        }
    }

    async deleteSign(signId: string) {
        try {
            const result = await this.prismaService.les_user_sign.delete({ where: { id: signId } });
            return result;
        } catch (error) {
            throw new NotFoundException(`Sign with ID ${signId} not found`);
        }
    }

    async updateSign(updateSignDto: UpdateSignDto) {
        try {
            const result = await this.prismaService.les_user_sign.update({
                where: {
                    id: updateSignDto.id
                },
                data: {
                    type: updateSignDto.type,
                    value: updateSignDto.value
                }
            });
            return result;
        } catch (error) {
            throw new NotFoundException(`Sign with ID ${updateSignDto.id} not found`);
        }
    }

    async getTestResults(userId: string) {
        return this.prismaService.les_user_test_result.findMany({
            where: { patient_id: userId },
            orderBy: { test_date: 'desc' }
        });
    }

    async createTestResult(userId: string, data: any) {
        return this.prismaService.les_user_test_result.create({
            data: {
                ...data,
                patient_id: userId
            }
        });
    }

    async deleteTestResult(id: string) {
        return this.prismaService.les_user_test_result.delete({
            where: { id }
        });
    }
}