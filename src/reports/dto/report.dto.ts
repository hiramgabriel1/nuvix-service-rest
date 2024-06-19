import { IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    readonly reportTitle: string

    @IsString()
    @IsNotEmpty()
    readonly descriptionReport: string
}