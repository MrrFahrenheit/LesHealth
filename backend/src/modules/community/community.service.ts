import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  // ----------------- POSTS -----------------
  async createPost(userId: string, data: any) {
    return this.prisma.les_post.create({
      data: {
        content: data.content,
        image_url: data.image_url,
        category: data.category || 'general',
        tags: data.tags || [],
        author_id: userId,
      },
      include: {
        les_user: {
          select: { full_name: true, role: true, avatar_url: true },
        },
      },
    });
  }

  async getPosts() {
    return this.prisma.les_post.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        les_user: {
          select: { id: true, full_name: true, role: true, avatar_url: true },
        },
        _count: {
          select: { les_post_like: true, les_post_comment: true },
        },
      },
    });
  }

  // ----------------- GROUPS -----------------
  async getGroups() {
    return this.prisma.les_community_group.findMany({
      include: {
        _count: {
          select: { les_community_group_member: true },
        },
      },
    });
  }

  // ----------------- LIKES -----------------
  async toggleLike(userId: string, postId: string) {
    const existing = await this.prisma.les_post_like.findUnique({
      where: {
        post_id_user_id: { post_id: postId, user_id: userId },
      },
    });

    if (existing) {
      await this.prisma.les_post_like.delete({
        where: { id: existing.id },
      });
      return { liked: false };
    }

    await this.prisma.les_post_like.create({
      data: { post_id: postId, user_id: userId },
    });
    return { liked: true };
  }
}
