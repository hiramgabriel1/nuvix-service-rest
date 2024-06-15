import { Body, Controller, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/post/:userId/create-post')
  createPost(@Param('userId') userId: number, @Body() postCreated: CreatePostDto) {
    return this.postsService.createPostUser(userId, postCreated);
  }
}