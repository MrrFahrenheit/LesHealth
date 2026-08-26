// src/common/guards/crud.guard.ts
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_OWNER_KEY, OwnerCheckOptions } from '../decorators/check-owner-decorator';

@Injectable()
export class CrudGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.getAllAndOverride<OwnerCheckOptions>(
      CHECK_OWNER_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!options) return true;

    const request = context.switchToHttp().getRequest();
    const sessionUser = request.user; // Poblado por JwtAuthGuard

    if (!sessionUser || !sessionUser.id) {
      throw new UnauthorizedException('Sesión inválida o usuario no autenticado');
    }

    // Bypass opcional para administradores
    if (options.allowAdmin && sessionUser.role === 'admin') {
      return true;
    }

    // Extraer el origen de datos (body, params o query)
    const sourceData = request[options.source || 'body'];
    if (!sourceData) {
      throw new ForbiddenException(`No se encontró el objeto de datos en req.${options.source}`);
    }

    // Resolver la propiedad (soporta 'userId' o 'author.id')
    const targetUserId = this.resolveNestedProperty(sourceData, options.fieldPath);

    if (!targetUserId) {
      throw new ForbiddenException(
        `El campo '${options.fieldPath}' no está presente en el payload enviado`,
      );
    }

    // Comparar ID de la sesión vs ID en el objeto
    if (String(sessionUser.id) !== String(targetUserId)) {
      throw new ForbiddenException(
        'El ID del usuario en los datos no coincide con tu sesión activa',
      );
    }

    return true;
  }

  // Función helper para leer propiedades como 'author.id' o 'patient_id'
  private resolveNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
  }
}