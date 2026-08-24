import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateRoutineDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    frequency?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

