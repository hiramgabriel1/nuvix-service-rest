import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {}