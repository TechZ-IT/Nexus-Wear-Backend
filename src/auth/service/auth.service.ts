// Update the AuthService to handle roles and permissions
// src/auth/service/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // New method to check if a user has specific permissions
  hasPermission(user: any, requiredPermission: string): boolean {
    if (!user || !user.permissions) {
      return false;
    }
    
    return user.permissions.some(
      (permission) => permission.name === requiredPermission
    );
  }
}