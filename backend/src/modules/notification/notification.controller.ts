import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SesionGuard } from 'src/common/guards/sesion.guard';

@Controller('notifications')
@UseGuards(SesionGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    async getMyNotifications(@Req() req: any) {
        return this.notificationService.getUserNotifications(req.user.id);
    }

    @Get('unread-count')
    async getUnreadCount(@Req() req: any) {
        const count = await this.notificationService.getUnreadCount(req.user.id);
        return { count };
    }

    @Patch('read-all')
    async markAllAsRead(@Req() req: any) {
        await this.notificationService.markAllAsRead(req.user.id);
        return { success: true };
    }

    @Patch(':id/read')
    async markAsRead(@Req() req: any, @Param('id') id: string) {
        await this.notificationService.markAsRead(req.user.id, id);
        return { success: true };
    }
}

