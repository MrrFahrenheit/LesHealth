import { Exclude, Expose } from "class-transformer";

export class LesUserResponseDto {
    
    id!:string;

    @Expose()
    full_name!: string;

    @Expose()
    email!: string;

    @Expose()
    isemailverified!: boolean;

    @Expose()
    is_verified_doctor?: boolean;

    @Expose()
    role?: string;

    //EXCLUIR
    @Exclude()
    password_hash!: string;
}