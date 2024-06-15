import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    ValidateNested,
    IsOptional,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(10)
    readonly username?: string;

    @IsString()
    @IsNotEmpty()
    readonly avatar_url: string;

    @IsString()
    @IsNotEmpty()
    readonly profesion: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsArray()
    @MaxLength(10, { each: true })
    readonly skills: string[];

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    readonly descriptionLong: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    readonly about: string;

    @IsArray()
    @MaxLength(10, { each: true })
    readonly social: string[];

    @IsString()
    @IsNotEmpty()
    readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    readonly employmentType: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly titleWork: string;

    @IsBoolean()
    readonly isCurrent: boolean;

    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(230)
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly titleProject: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(230)
    readonly descriptionProject: string;

    @IsArray()
    @MaxLength(50, { each: true })
    readonly workSkills: string[];

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}
