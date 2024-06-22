import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PostsSavesService } from './posts-saves.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('bookmarks')
export class PostsSavesController {
  constructor(private readonly postsSavesService: PostsSavesService) {}

  @UseGuards(AuthGuard)
  @Post('/post/:postId/user/:userId')
  savePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ){
    return this.postsSavesService.addPostToMyList(postId, userId)
  }

}
