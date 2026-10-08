import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  // Groups
  async createGroup(data: any) {
    return this.prisma.les_community_group.create({ data });
  }

  async findAllGroups() {
    return this.prisma.les_community_group.findMany();
  }

  async findGroup(id: string) {
    const group = await this.prisma.les_community_group.findUnique({
      where: { id },
      include: { les_community_group_member: true },
    });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async updateGroup(id: string, data: any) {
    await this.findGroup(id);
    return this.prisma.les_community_group.update({ where: { id }, data });
  }

  async removeGroup(id: string) {
    await this.findGroup(id);
    return this.prisma.les_community_group.delete({ where: { id } });
  }

  // Group Members
  async joinGroup(groupId: string, userId: string) {
    await this.findGroup(groupId);
    return this.prisma.les_community_group_member.create({
      data: { group_id: groupId, user_id: userId },
    });
  }

  async leaveGroup(groupId: string, userId: string) {
    const member = await this.prisma.les_community_group_member.findUnique({
      where: { group_id_user_id: { group_id: groupId, user_id: userId } },
    });
    if (!member) throw new NotFoundException('Member not found in group');
    return this.prisma.les_community_group_member.delete({
      where: { id: member.id },
    });
  }

  // Posts
  async createPost(data: any, authorId: string) {
    return this.prisma.les_post.create({
      data: { ...data, author_id: authorId },
    });
  }

  async findAllPosts(groupId?: string) {
    const where = groupId ? { group_id: groupId } : {};
    return this.prisma.les_post.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        les_user: { select: { id: true, full_name: true, avatar_url: true } },
        _count: { select: { les_post_comment: true, les_post_like: true } },
      },
    });
  }

  async findPost(id: string) {
    const post = await this.prisma.les_post.findUnique({
      where: { id },
      include: {
        les_post_comment: {
          include: { les_user: { select: { id: true, full_name: true } } },
        },
        les_post_like: true,
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async updatePost(id: string, data: any) {
    await this.findPost(id);
    return this.prisma.les_post.update({ where: { id }, data });
  }

  async removePost(id: string) {
    await this.findPost(id);
    return this.prisma.les_post.delete({ where: { id } });
  }

  // Comments
  async addComment(postId: string, authorId: string, data: any) {
    await this.findPost(postId);
    return this.prisma.les_post_comment.create({
      data: { ...data, post_id: postId, author_id: authorId },
    });
  }

  async removeComment(commentId: string) {
    const comment = await this.prisma.les_post_comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.prisma.les_post_comment.delete({ where: { id: commentId } });
  }

  // Likes
  async likePost(postId: string, userId: string) {
    await this.findPost(postId);
    return this.prisma.les_post_like.create({
      data: { post_id: postId, user_id: userId },
    });
  }

  async unlikePost(postId: string, userId: string) {
    const like = await this.prisma.les_post_like.findUnique({
      where: { post_id_user_id: { post_id: postId, user_id: userId } },
    });
    if (!like) throw new NotFoundException('Like not found');
    return this.prisma.les_post_like.delete({ where: { id: like.id } });
  }
}
