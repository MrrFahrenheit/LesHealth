import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteSignDto{
    @IsUUID()
    @IsNotEmpty()
    id!:string;

    @IsUUID()
    @IsNotEmpty()
    user_id!:string
}