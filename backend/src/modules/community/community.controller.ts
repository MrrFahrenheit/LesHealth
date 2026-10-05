import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { LesUserResponseDto } from 'src/common/dto/les-user-dto';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CommunityService } from './community.service';

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

  @Get('posts/:id/comments')
  getComments(@Param('id') postId: string) {
    return this.communityService.getComments(postId);
  }

  @Post('posts/:id/comments')
  addComment(
    @CurrentUser() user: LesUserResponseDto, 
    @Param('id') postId: string, 
    @Body() data: { content: string }
  ) {
    return this.communityService.addComment(user.id, postId, data.content);
  }

  @Delete('comments/:id')
  deleteComment(@CurrentUser() user: LesUserResponseDto, @Param('id') commentId: string) {
    return this.communityService.deleteComment(user.id, commentId);
  }

  @Patch('posts/:id')
  updatePost(@CurrentUser() user: LesUserResponseDto, @Param('id') postId: string, @Body() data: any) {
    return this.communityService.updatePost(user.id, postId, data);
  }

  @Delete('posts/:id')
  deletePost(@CurrentUser() user: LesUserResponseDto, @Param('id') postId: string) {
    return this.communityService.deletePost(user.id, postId);
  }

  @Get('groups')
  getGroups() {
    return this.communityService.getGroups();
  }
}
