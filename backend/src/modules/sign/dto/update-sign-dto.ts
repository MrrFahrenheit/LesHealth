import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateSignDto } from "./create-sign-dto";

export class UpdateSignDto extends CreateSignDto{
    @IsUUID()
    @IsNotEmpty()
    id!:string;

    @IsUUID()
    @IsNotEmpty()
    user_id!:string;
}