import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { PostsSavesService } from './bookmarks.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('bookmarks')
export class PostsSavesController {
  constructor(private readonly postsSavesService: PostsSavesService) {}

  // @UseGuards(AuthGuard)
  @Get('/show-my-bookmarks/:userId')
  myBookmarks(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsSavesService.myBookmarksSaved(userId);
  }

  // @UseGuards(AuthGuard)
  @Post('/save/job/:postId/user/:userId')
  savePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsSavesService.addPostToMyList(postId, userId);
  }

  // @UseGuards(AuthGuard)
  @Delete('/remove/job/:postId/user/:userId')
  deleteBookmark(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsSavesService.removePostLists(postId, userId);
  }
}
