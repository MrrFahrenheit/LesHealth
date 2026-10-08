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

    async getAIInsights(userId: string) {
        try {
            const signs = await this.getAllUserSigns(userId);
            const testResults = await this.getTestResults(userId);
            
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy' });
            
            const prompt = `Eres un asistente médico inteligente para la plataforma LesHealth. Analiza los siguientes signos vitales y resultados de laboratorio del usuario y proporciona un breve comentario, consejo o advertencia amistosa en español (máximo 2 párrafos).
            Signos Vitales: ${JSON.stringify(signs)}
            Resultados de pruebas: ${JSON.stringify(testResults)}
            
            Instrucciones críticas:
            1. Si los datos están completamente vacíos (por ejemplo '{}' y '[]') o son muy pocos, NO generes falsas alarmas, NO saques conclusiones médicas precipitadas ni hables de tendencias que no existen. En su lugar, dale una cálida bienvenida, explícale la importancia de llevar un registro continuo para poder brindarle un buen análisis, y motívalo a que empiece a registrar sus signos y resultados médicos.
            2. Si hay datos suficientes, responde de forma clara y amable al paciente. No des diagnósticos definitivos, pero sugiere consultar a un médico si notas algo anormal de forma consistente.
            3. Utiliza formato markdown para tu respuesta.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            return { insight: response.text };
        } catch (error) {
            console.error('Error getting AI insight:', error);
            return { insight: "En este momento no pudimos procesar tus resultados para generar un análisis. Por favor, inténtalo de nuevo más tarde." };
        }
    }
}