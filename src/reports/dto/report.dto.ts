import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    readonly titleReport: string

    @IsString()
    @IsNotEmpty()
    readonly typeReport: string

    @IsString()
    @IsNotEmpty()
    readonly descriptionReport: string

    @IsBoolean()
    @IsNotEmpty()
    readonly isPending: boolean
    
    @IsBoolean()
    @IsNotEmpty()
    readonly isResolved: boolean
}