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
import { JobsService } from './jobs.service';
import { CreatePostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // @UseGuards(AuthGuard)
  @Post('/:userId/create-post')
  createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() postCreated: CreatePostDto,
  ) {
    return this.jobsService.createPostUser(userId, postCreated);
  }

  @Get('/all-jobs')
  show() {
    return this.jobsService.showPosts();
  }

  @UseGuards(AuthGuard)
  @Get('posts/')
  showPagePosts(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.jobsService.showPagePosts(page, limit);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/post/:postId/user-posted/:userId')
  updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newContentPost: UpdatePostDto,
  ) {
    return this.jobsService.editPost(postId, userId, newContentPost);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/post/:postId/user-posted/:userId')
  removePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.jobsService.removePost(postId, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/candidates/post/:postId/profile/:userId')
  findMyCandidates(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.jobsService.viewCandidatesToMyPosts(postId, userId);
  }

  // @UseGuards(AuthGuard)
  @Get('/my-postulates/user/:userId')
  findMyPostulates(@Param('userId', ParseIntPipe) userId: number) {
    return this.jobsService.viewMyPostulates(userId);
  }
}