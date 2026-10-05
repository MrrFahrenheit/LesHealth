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
      },
    });

    return posts.map(post => ({
      ...post,
      isLiked: post.les_post_like.length > 0,
      les_post_like: undefined, // No expongas los detalles de likes a nivel de cliente si no es necesario
    }));
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

  // ----------------- POSTS (EDIT / DELETE) -----------------
  async editPost(userId: string, postId: string, data: any) {
    const post = await this.prisma.les_post.findUnique({ where: { id: postId } });
    if (!post || post.author_id !== userId) {
      throw new Error("No puedes editar esta publicación");
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
    if (!post || post.author_id !== userId) {
      throw new Error("No puedes eliminar esta publicación");
    }
    return this.prisma.les_post.delete({
      where: { id: postId }
    });
  }

  // ----------------- COMMENTS & TAGGING -----------------
  async addComment(userId: string, postId: string, content: string) {
    const user = await this.prisma.les_user.findUnique({ where: { id: userId }, select: { full_name: true } });
    const post = await this.prisma.les_post.findUnique({ where: { id: postId }, select: { author_id: true } });

    const comment = await this.prisma.les_post_comment.create({
      data: {
        content,
        author_id: userId,
        post_id: postId,
      },
      include: {
        les_user: { select: { full_name: true, avatar_url: true } }
      }
    });

    // Notificar al autor del post (si no es él mismo)
    if (post && user && post.author_id !== userId) {
      await this.notificationService.createNotification(
        post.author_id,
        'Nuevo Comentario',
        `${user.full_name} comentó en tu publicación: "${content.substring(0, 30)}..."`,
        'COMMENT',
        `/les/community`
      );
    }

    // Detectar etiquetas: @Nombre (usando regex simple para atrapar la primera palabra)
    const tagRegex = /@([a-zA-Z0-9_]+)/g;
    const tags = [...content.matchAll(tagRegex)].map(m => m[1]);

    if (tags.length > 0 && user) {
      // Buscar usuarios cuyo primer nombre coincida
      for (const tag of tags) {
        const taggedUsers = await this.prisma.les_user.findMany({
          where: {
            full_name: {
              startsWith: tag,
              mode: 'insensitive'
            }
          },
          take: 1
        });

        if (taggedUsers.length > 0) {
          const taggedUser = taggedUsers[0];
          if (taggedUser.id !== userId) { // No te notifiques a ti mismo si te auto-etiquetas
            await this.notificationService.createNotification(
              taggedUser.id,
              'Te han mencionado',
              `${user.full_name} te mencionó en un comentario.`,
              'MENTION',
              `/les/community`
            );
          }
        }
      }
    }

    return comment;
  }

  async getComments(postId: string) {
    return this.prisma.les_post_comment.findMany({
      where: { post_id: postId },
      orderBy: { created_at: 'asc' },
      include: {
        les_user: { select: { id: true, full_name: true, avatar_url: true } }
      }
    });
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.prisma.les_post_comment.findUnique({ where: { id: commentId } });
    if (!comment || comment.author_id !== userId) {
      throw new Error("No puedes eliminar este comentario");
    }
    return this.prisma.les_post_comment.delete({ where: { id: commentId } });
  }
}
