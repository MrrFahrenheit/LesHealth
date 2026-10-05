import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService, private notificationService: NotificationService) {}

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

  async getPosts(userId: string) {
    const posts = await this.prisma.les_post.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        les_user: {
          select: { id: true, full_name: true, role: true, avatar_url: true },
        },
        _count: {
          select: { les_post_like: true, les_post_comment: true },
        },
        les_post_like: {
          where: { user_id: userId },
          select: { id: true },
        },
        les_post_comment: {
          orderBy: { created_at: 'asc' },
          include: {
            les_user: {
              select: { id: true, full_name: true, avatar_url: true }
            }
          }
        }
      },
    });

    return posts.map(post => ({
      ...post,
      isLiked: post.les_post_like.length > 0,
      les_post_like: undefined, // No expongas los detalles de likes a nivel de cliente si no es necesario
    }));
  }

  async updatePost(userId: string, postId: string, data: any) {
    const post = await this.prisma.les_post.findUnique({ where: { id: postId } });
    if (!post || post.author_id !== userId) throw new Error('No autorizado');

    return this.prisma.les_post.update({
      where: { id: postId },
      data: {
        content: data.content,
        image_url: data.image_url,
        updated_at: new Date(),
      },
    });
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.prisma.les_post.findUnique({ where: { id: postId } });
    if (!post || post.author_id !== userId) throw new Error('No autorizado');

    return this.prisma.les_post.delete({
      where: { id: postId },
    });
  }
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

    // Enviar notificación al autor del post
    const post = await this.prisma.les_post.findUnique({
      where: { id: postId },
      select: { author_id: true }
    });
    const user = await this.prisma.les_user.findUnique({
      where: { id: userId },
      select: { full_name: true }
    });

    if (post && user && post.author_id !== userId) {
      await this.notificationService.createNotification(
        post.author_id,
        'Nuevo Like',
        `${user.full_name} le dio like a tu publicación.`,
        'LIKE',
        `/les/community`
      );
    }

      return { liked: true };
    }

  // ----------------- COMMENTS -----------------
  async addComment(userId: string, postId: string, data: { content: string, mentions?: string[] }) {
    const comment = await this.prisma.les_post_comment.create({
      data: {
        post_id: postId,
        author_id: userId,
        content: data.content,
      },
      include: {
        les_user: { select: { full_name: true, avatar_url: true } }
      }
    });

    const post = await this.prisma.les_post.findUnique({ where: { id: postId }, select: { author_id: true } });
    
    // Notificar al dueño del post
    if (post && post.author_id !== userId) {
      await this.notificationService.createNotification(
        post.author_id,
        'Nuevo Comentario',
        `${comment.les_user.full_name} comentó en tu publicación.`,
        'COMMENT',
        `/les/community`
      );
    }

    // Notificar a los mencionados (data.mentions contiene strings como "Juan", "Odallys")
    if (data.mentions && data.mentions.length > 0) {
      for (const mentionName of data.mentions) {
        // Buscar al usuario por nombre (usando ilike o contains si es necesario, aquí exacto o por primer nombre)
        // Como 'mentions' no tiene espacios (porque extrajimos con \w+), buscamos coincidencias en full_name
        const mentionedUser = await this.prisma.les_user.findFirst({
          where: { full_name: { contains: mentionName, mode: 'insensitive' } },
          select: { id: true }
        });

        if (mentionedUser && mentionedUser.id !== userId) {
          await this.notificationService.createNotification(
            mentionedUser.id,
            'Te mencionaron',
            `${comment.les_user.full_name} te mencionó en un comentario.`,
            'MENTION',
            `/les/community`
          );
        }
      }
    }

    return comment;
  }
}
