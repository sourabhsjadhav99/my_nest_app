
import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum'; 

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>(ROLES_KEY, context.getHandler());
    if (!requiredRole) {
      return true; 
    }

    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(`User role: ${user.role}, Required role: ${requiredRole}`);

    if (!user || !user.role) {
      return false; 
    }

    const hasRole = user.role === requiredRole;
    if (!hasRole) {
      this.logger.warn(`Access denied. User role: ${user.role}, Required role: ${requiredRole}`);
    }

    return hasRole;
  }
}
