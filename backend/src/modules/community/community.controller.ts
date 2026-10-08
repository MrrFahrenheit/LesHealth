import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { LesUserResponseDto } from 'src/common/dto/les-user-dto';

@Controller('community')
@UseGuards(SesionGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // Groups
  @Post('groups')
  createGroup(@Body() createGroupDto: any) {
    return this.communityService.createGroup(createGroupDto);
  }

  @Get('groups')
  findAllGroups() {
    return this.communityService.findAllGroups();
  }

  @Get('groups/:id')
  findGroup(@Param('id') id: string) {
    return this.communityService.findGroup(id);
  }

  @Patch('groups/:id')
  updateGroup(@Param('id') id: string, @Body() updateGroupDto: any) {
    return this.communityService.updateGroup(id, updateGroupDto);
  }

  @Delete('groups/:id')
  removeGroup(@Param('id') id: string) {
    return this.communityService.removeGroup(id);
  }

  @Post('groups/:id/join')
  joinGroup(
    @Param('id') groupId: string,
    @CurrentUser() user: LesUserResponseDto,
  ) {
    return this.communityService.joinGroup(groupId, user.id);
  }

  @Post('groups/:id/leave')
  leaveGroup(
    @Param('id') groupId: string,
    @CurrentUser() user: LesUserResponseDto,
  ) {
    return this.communityService.leaveGroup(groupId, user.id);
  }

  // Posts
  @Post('posts')
  createPost(
    @CurrentUser() user: LesUserResponseDto,
    @Body() createPostDto: any,
  ) {
    return this.communityService.createPost(createPostDto, user.id);
  }

  @Get('posts')
  findAllPosts(@Query('group_id') groupId?: string) {
    return this.communityService.findAllPosts(groupId);
  }

  @Get('posts/:id')
  findPost(@Param('id') id: string) {
    return this.communityService.findPost(id);
  }

  @Patch('posts/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: any) {
    return this.communityService.updatePost(id, updatePostDto);
  }

  @Delete('posts/:id')
  removePost(@Param('id') id: string) {
    return this.communityService.removePost(id);
  }

  // Comments
  @Post('posts/:id/comments')
  addComment(
    @Param('id') postId: string,
    @CurrentUser() user: LesUserResponseDto,
    @Body() addCommentDto: any,
  ) {
    return this.communityService.addComment(postId, user.id, addCommentDto);
  }

  @Delete('comments/:id')
  removeComment(@Param('id') commentId: string) {
    return this.communityService.removeComment(commentId);
  }

  // Likes
  @Post('posts/:id/like')
  likePost(
    @Param('id') postId: string,
    @CurrentUser() user: LesUserResponseDto,
  ) {
    return this.communityService.likePost(postId, user.id);
  }

  @Post('posts/:id/unlike')
  unlikePost(
    @Param('id') postId: string,
    @CurrentUser() user: LesUserResponseDto,
  ) {
    return this.communityService.unlikePost(postId, user.id);
  }
}
