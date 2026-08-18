import { user_role } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class AuthCreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password!: string;

    @IsNotEmpty()
    @IsString()
    full_name!: string;

    @IsString()
    @IsOptional()
    speciality!: string;

    @IsString()
    @IsOptional()
    license_number!: string;
}