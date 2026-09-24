import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

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