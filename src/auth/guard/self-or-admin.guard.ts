// src/auth/guards/self-or-admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = parseInt(request.params.id);
    
    if (!user) {
      throw new UnauthorizedException('User information missing');
    }
    
    // Allow if admin or if the user is accessing their own data
    if (user.role === 'admin' || user.sub === userId) {
      return true;
    }
    
    throw new UnauthorizedException('Access denied: You can only access your own data or need admin privileges');
  }
}