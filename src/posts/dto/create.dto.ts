import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Max(50)
  //   @Min(5)
  readonly titlePost: string;

  @IsString()
  @IsNotEmpty()
  @Max(320, { message: 'only 320 max characters' })
  //   @Min(10)
  readonly descriptionPost: string;

  @IsString()
  @IsOptional()
  readonly photoUrlWallpaper: string;

  @IsString()
  @IsOptional()
  readonly imageUrlReference: string;

  @IsNumber()
  readonly likesCount: number

  @IsString()
  @IsNotEmpty()
  readonly categoryPost: string;
}
