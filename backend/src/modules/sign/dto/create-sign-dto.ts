import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSignDto{
    @IsUUID()
    @IsNotEmpty()
    patient_id!:string;

    @IsString()
    @IsNotEmpty()
    type!:string;

    @IsNumber()
    @IsNotEmpty()
    value!:number
}