import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserBetaDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;

    @IsString()
    @IsNotEmpty()
    readonly reasons: string;
}
