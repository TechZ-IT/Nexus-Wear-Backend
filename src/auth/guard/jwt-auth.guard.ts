// Update the JwtAuthGuard to include permissions
// src/auth/guards/jwt-auth.guard.ts (modified)
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entity/role.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the endpoint is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const decoded = this.jwtService.verify(token);

      // Get the full role with permissions
      if (decoded.roleId) {
        const role = await this.roleRepository.findOne({
          where: { id: decoded.roleId },
        });

        if (role) {
          // Enhance the user object with the role info
          request.user = {
            id: decoded.id,
            email: decoded.email,
            roleId: decoded.roleId,
            role: role.name,
          };
        } else {
          request.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          };
        }
      } else {
        request.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        };
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Authentication failed: ' + error.message,
      );
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
