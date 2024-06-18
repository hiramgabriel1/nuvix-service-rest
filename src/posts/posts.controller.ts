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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(AuthGuard)
  @Post('/post/:userId/create-post')
  createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() postCreated: CreatePostDto,
  ) {
    return this.postsService.createPostUser(userId, postCreated);
  }

  @Get('posts/all-posts')
  show() {
    return this.postsService.showPosts();
  }

  @Get('posts/')
  showPagePosts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.postsService.showPagePosts(page, limit);
  }

  @UseGuards(AuthGuard)
  @Patch('posts/update/post/:postId/user-posted/:userId')
  updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newContentPost: UpdatePostDto,
  ) {
    return this.postsService.editPost(postId, userId, newContentPost);
  }

  @UseGuards(AuthGuard)
  @Delete('posts/delete/post/:postId/user-posted/:userId')
  removePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.removePost(postId, userId);
  }

  // @UseGuards(AuthGuard)
  @Get('posts/candidates/post/:postId/profile/:userId')
  findMyCandidates(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.viewCandidatesToMyPosts(postId, userId);
  }

  @UseGuards(AuthGuard)
  @Get('posts/my-postulates/user/:userId')
  findMyPostulates(
    @Param('userId', ParseIntPipe) userId: number
  ){
    return this.postsService.viewMyPostulates(userId)
  }
}