import { IsString } from "class-validator";

export class SavePostsDto {
    @IsString()
    readonly idPost: string

}