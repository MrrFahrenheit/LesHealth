import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { ModerationService } from '../moderation/moderation.service';

@Injectable()
export class CommunityService {
  constructor(
    private prisma: PrismaService, 
    private notificationService: NotificationService,
    private moderationService: ModerationService
  ) {}

  // ----------------- POSTS -----------------
  async createPost(userId: string, data: any) {
    if (data.content) {
      await this.moderationService.validateTextOrThrow(data.content);
    }
    if (data.image_url) {
      await this.moderationService.validateImageUrlOrThrow(data.image_url);
    }

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
    if (!post || post.author_id !== userId) throw new Error("No autorizado o no encontrado");

    if (data.content) {
      await this.moderationService.validateTextOrThrow(data.content);
    }
    if (data.image_url) {
      await this.moderationService.validateImageUrlOrThrow(data.image_url);
    }

    return this.prisma.les_post.update({
      where: { id: postId },
      data: {
        content: data.content,
        image_url: data.image_url,
        category: data.category,
        tags: data.tags,
      }
    });
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.prisma.les_post.findUnique({ where: { id: postId } });
    if (!post || post.author_id !== userId) throw new Error("No autorizado o no encontrado");

    return this.prisma.les_post.delete({ where: { id: postId } });
  }

  // ----------------- COMMENTS -----------------
  async getComments(postId: string) {
    return this.prisma.les_post_comment.findMany({
      where: { post_id: postId },
      orderBy: { created_at: 'asc' },
      include: {
        les_user: {
          select: { id: true, full_name: true, avatar_url: true }
        }
      }
    });
  }

  async addComment(userId: string, postId: string, content: string) {
    if (content) {
      await this.moderationService.validateTextOrThrow(content);
    }

    const comment = await this.prisma.les_post_comment.create({
      data: {
        post_id: postId,
        author_id: userId,
        content: content,
      },
      include: {
        les_user: { select: { full_name: true, avatar_url: true } }
      }
    });

    const post = await this.prisma.les_post.findUnique({ where: { id: postId }, select: { author_id: true } });
    
    // Notificación al dueño del post
    if (post && post.author_id !== userId) {
      await this.notificationService.createNotification(
        post.author_id,
        'Nuevo Comentario',
        `${comment.les_user.full_name} comentó en tu publicación.`,
        'COMMENT',
        `/les/community`
      );
    }

    // Buscar menciones usando regex simple: @Nombre
    const mentions = content.match(/@(\w+)/g);
    if (mentions) {
      for (const mention of mentions) {
        // En un caso real buscarías el user_name exacto, aquí buscamos por full_name parecido o ignoramos si no hay username
        // Asumiendo que el tag usa el primer nombre
        const nameQuery = mention.substring(1); 
        const taggedUser = await this.prisma.les_user.findFirst({
          where: { full_name: { contains: nameQuery, mode: 'insensitive' } },
          select: { id: true }
        });

        if (taggedUser && taggedUser.id !== userId) {
          await this.notificationService.createNotification(
            taggedUser.id,
            'Te han mencionado',
            `${comment.les_user.full_name} te mencionó en un comentario.`,
            'MENTION',
            `/les/community`
          );
        }
      }
    }

    return comment;
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.prisma.les_post_comment.findUnique({ where: { id: commentId } });
    if (!comment || comment.author_id !== userId) throw new Error("No autorizado o no encontrado");

    return this.prisma.les_post_comment.delete({ where: { id: commentId } });
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
}
