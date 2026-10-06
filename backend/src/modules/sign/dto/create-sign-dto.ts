import { IsNotEmpty, IsNumber, IsString, IsOptional, IsUUID } from "class-validator";

export class CreateSignDto{
    @IsString()
    @IsNotEmpty()
    type!:string;

    @IsNumber()
    @IsNotEmpty()
    value!:number;

    @IsOptional()
    @IsString()
    patient_id?: string;
}