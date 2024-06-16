import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/post.update.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('/post/:userId/create-post')
  createPost(
    @Param('userId') userId: number,
    @Body() postCreated: CreatePostDto,
  ) {
    return this.postsService.createPostUser(userId, postCreated);
  }

  @Get('posts/all-posts')
  show() {
    return this.postsService.showPosts();
  }

  @Get('posts/')
  showPagePosts(
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.postsService.showPagePosts(page, limit);
  }

  @Patch('posts/update/post/:postId/user-posted/:userId')
  updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newContentPost: UpdatePostDto,
  ) {
    return this.postsService.editPost(postId, userId, newContentPost);
  }

  @Delete('posts/delete/post/:postId/user-posted/:userId')
  removePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.postsService.removePost(postId, userId);
  }
}
