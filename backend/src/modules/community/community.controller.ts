import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { LesUserResponseDto } from 'src/common/dto/les-user-dto';

@Controller('community')
@UseGuards(SesionGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('posts')
  getPosts(@CurrentUser() user: LesUserResponseDto) {
    return this.communityService.getPosts(user.id);
  }

  @Post('posts')
  createPost(@CurrentUser() user: LesUserResponseDto, @Body() data: any) {
    return this.communityService.createPost(user.id, data);
  }

  @Post('posts/:id/like')
  toggleLike(@CurrentUser() user: LesUserResponseDto, @Param('id') postId: string) {
    return this.communityService.toggleLike(user.id, postId);
  }

  @Get('groups')
  getGroups() {
    return this.communityService.getGroups();
  }

  // ----------------- POSTS (EDIT / DELETE) -----------------
  @Patch('posts/:id')
  editPost(@CurrentUser() user: LesUserResponseDto, @Param('id') id: string, @Body() data: any) {
    return this.communityService.editPost(user.id, id, data);
  }

  @Delete('posts/:id')
  deletePost(@CurrentUser() user: LesUserResponseDto, @Param('id') id: string) {
    return this.communityService.deletePost(user.id, id);
  }

  // ----------------- COMMENTS -----------------
  @Get('posts/:id/comments')
  getComments(@Param('id') id: string) {
    return this.communityService.getComments(id);
  }

  @Post('posts/:id/comments')
  addComment(@CurrentUser() user: LesUserResponseDto, @Param('id') id: string, @Body() data: { content: string }) {
    return this.communityService.addComment(user.id, id, data.content);
  }

  @Delete('comments/:id')
  deleteComment(@CurrentUser() user: LesUserResponseDto, @Param('id') id: string) {
    return this.communityService.deleteComment(user.id, id);
  }
}
