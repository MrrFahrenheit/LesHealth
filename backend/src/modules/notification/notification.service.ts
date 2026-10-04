import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class NotificationService {
    constructor(private prisma: PrismaService) {}

    // Crear una nueva notificación (generalmente usado por otros servicios del backend)
    async createNotification(userId: string, title: string, message: string, type: string, linkUrl?: string) {
        return this.prisma.les_notification.create({
            data: {
                user_id: userId,
                title,
                message,
                type,
                link_url: linkUrl,
            }
        });
    }

    // Obtener notificaciones del usuario (las últimas 20)
    async getUserNotifications(userId: string) {
        return this.prisma.les_notification.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            take: 20
        });
    }

    // Obtener conteo de notificaciones no leídas
    async getUnreadCount(userId: string) {
        return this.prisma.les_notification.count({
            where: { user_id: userId, is_read: false }
        });
    }

    // Marcar una notificación como leída
    async markAsRead(userId: string, notificationId: string) {
        return this.prisma.les_notification.updateMany({
            where: { id: notificationId, user_id: userId },
            data: { is_read: true }
        });
    }

    // Marcar todas como leídas
    async markAllAsRead(userId: string) {
        return this.prisma.les_notification.updateMany({
            where: { user_id: userId, is_read: false },
            data: { is_read: true }
        });
    }
}

