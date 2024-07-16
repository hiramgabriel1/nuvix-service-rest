import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsDecimal,
    IsNotEmpty,
    IsString,
    IsArray,
} from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    readonly projectTitle: string;

    @IsString()
    @IsNotEmpty()
    readonly projectLocation: string;

    @IsString()
    @IsNotEmpty()
    readonly projectDescription: string;

    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    readonly isProjectRemote: boolean;

    @IsDecimal()
    @IsNotEmpty()
    readonly salaryRange: number;

    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    readonly isPayment: boolean;

    @IsArray()
    @IsNotEmpty()
    readonly skills: string[];
}
