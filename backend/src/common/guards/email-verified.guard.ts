import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const user = request.user;

    // Si no hay usuario (SesionGuard no pasó) o si el correo no está verificado, bloqueamos
    if (!user || !user.isemailverified) {
      throw new ForbiddenException('Acceso denegado: Debe verificar su correo electrónico para realizar esta acción.');
    }

    return true;
  }
}

