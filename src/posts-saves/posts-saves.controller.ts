import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PostsSavesService } from './posts-saves.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class PostsSavesController {
  constructor(private readonly postsSavesService: PostsSavesService) {}

  @UseGuards(AuthGuard)
  @Post('my-posts-saves/post/:postId/user/:userId')
  savePost(
    @Param('postId') postId: number,
    @Param('userId') userId: number,
  ){
    return this.postsSavesService.addPostToMyList(postId, userId)
  }

}
