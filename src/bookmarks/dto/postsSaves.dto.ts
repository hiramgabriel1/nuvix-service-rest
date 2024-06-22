import { IsInt } from "class-validator";

export class SavePostsDto {
    @IsInt()
    readonly postId: number
}