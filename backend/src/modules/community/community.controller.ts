import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { SesionGuard } from 'src/common/guards/sesion.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';

@Controller('community')
@UseGuards(SesionGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('posts')
  getPosts() {
    return this.communityService.getPosts();
  }

  @Post('posts')
  createPost(@CurrentUser() user: any, @Body() data: any) {
    return this.communityService.createPost(user.id, data);
  }

  @Post('posts/:id/like')
  toggleLike(@CurrentUser() user: any, @Param('id') postId: string) {
    return this.communityService.toggleLike(user.id, postId);
  }

  @Get('groups')
  getGroups() {
    return this.communityService.getGroups();
  }
}
