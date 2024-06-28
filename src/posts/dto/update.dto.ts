import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create.dto';

export class UpdatePost extends PartialType(CreatePostDto) {}
