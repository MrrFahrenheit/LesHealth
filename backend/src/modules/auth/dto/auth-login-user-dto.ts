import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginUserDto{
    @IsString()
    @IsNotEmpty()
    password!:string;

    @IsEmail()
    @IsNotEmpty()
    email!:string;
}