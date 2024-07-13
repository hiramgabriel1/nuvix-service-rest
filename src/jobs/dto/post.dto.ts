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
    // @IsNotEmpty()
    readonly projectDescription: string

    @IsBoolean()
    readonly isProjectRemote: boolean;

    @IsDecimal()
    // @IsNotEmpty()
    readonly salaryRange: number;

    @IsBoolean()
    readonly isPayment: boolean;

    @IsArray()
    @IsNotEmpty()
    readonly skills: string[];
}
