import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
}
