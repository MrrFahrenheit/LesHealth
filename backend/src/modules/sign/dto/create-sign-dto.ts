import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSignDto{
    @IsString()
    @IsNotEmpty()
    type!:string;

    @IsNumber()
    @IsNotEmpty()
    value!:number
}