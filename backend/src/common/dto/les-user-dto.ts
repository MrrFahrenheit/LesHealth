import { Exclude, Expose } from "class-transformer";

export class LesUserResponseDto {
    
    id!:string;

    @Expose()
    full_name!: string;

    @Expose()
    email!: string;

    //EXCLUIR
    @Exclude()
    password_hash!: string;
}