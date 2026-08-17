import { user_role } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class AuthCreateUserDto {
    @IsUUID()
    @IsNotEmpty()
    id!: string;

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

    @IsEnum(user_role)
    @IsNotEmpty()
    user_role!: user_role;

    @IsString()
    @IsOptional()
    speciality!: string;

    @IsString()
    @IsOptional()
    license_number!: string;

    @IsNotEmpty({ message: 'La fecha de expiración es obligatoria' })
    @Type(() => Date)
    @IsDate({ message: 'Debe ser una fecha válida' })
    created_at!: Date;
}