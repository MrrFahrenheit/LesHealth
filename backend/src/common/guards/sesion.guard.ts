// src/auth/guards/session.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class SesionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    const token = request.cookies['sesion_token'];

    if (!token) {
      response.clearCookie('sesion_token', { httpOnly: true, sameSite: 'lax', path: '/' });
      throw new UnauthorizedException('Sesión no encontrada');
    }

    // 2. Buscar la sesión en la base de datos e incluir los datos del usuario
    const session = await this.prisma.les_sesion.findUnique({
      where: { refresh_token:token },
      include: {
        les_user: {
          select: {
            id:true,
            email: true,
            full_name: true,
            isemailverified: true,
          },
        },
      },
    });

    if (!session || session.is_revoked || new Date() > session.expires_at) {
      response.clearCookie('sesion_token', { httpOnly: true, sameSite: 'lax', path: '/' });
      throw new UnauthorizedException('Sesión inválida o expirada');
    }

    // 4. 🚀 ADJUNTAR EL USUARIO AL REQUEST
    // Ahora cualquier controlador o decorador posterior tendrá acceso a req.user
    request.user = session.les_user;
    request.sesionId = session.id; // Adjuntar el ID de la sesión al request

    return true;
  }
}