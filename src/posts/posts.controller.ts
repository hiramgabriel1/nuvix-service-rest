import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreatePostDto } from './dto/create.dto';
import { UpdatePost } from './dto/update.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(AuthGuard)
  @Post('/create-post/:userId')
  createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() postData: CreatePostDto,
  ) {
    return this.postsService.userCreatePost(userId, postData);
  }

  // @UseGuards(AuthGuard)
  @Get('/show-posts')
  showAllPosts() {
    return this.postsService.showPosts();
  }

  // @UseGuards(AuthGuard)
  @Delete('/remove-my-post/user/:userId/post/:postId')
  removeMyPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.postsService.deleteMyPost(userId, postId);
  }

  // @UseGuards(AuthGuard)
  @Patch('/update-post/user/:userId/post-updated/:postId')
  updatePost(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() newPost: UpdatePost,
  ) {
    return this.postsService.editMyPost(userId, postId, newPost);
  }

  // @UseGuards(AuthGuard)
  @Get('/show/my-posts/user/:userId')
  myPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.showOnlyMyPosts(userId);
  }

  // @UseGuards(AuthGuard)
  @Get('/popular-posts')
  popularPosts(){
    return this.postsService.showPopularPosts()
  }
}