// src/upload/interceptors/file-upload.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  UnsupportedMediaTypeException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/rtf',
  ];

  private readonly maxFileSize = 10 * 1024 * 1024; // 10MB

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file as Express.Multer.File;
    const files = request.files as Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };

    if (file) {
      this.validateFile(file);
    }

    if (files) {
      if (Array.isArray(files)) {
        files.forEach(f => this.validateFile(f));
      } else {
        // Handle multiple field uploads
        Object.keys(files).forEach(fieldName => {
          files[fieldName].forEach(f => this.validateFile(f));
        });
      }
    }

    return next.handle();
  }

  private validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new PayloadTooLargeException(
        `File size exceeds limit. Maximum allowed: ${this.maxFileSize / (1024 * 1024)}MB`
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeException(
        `Invalid file type. Allowed types: ${this.allowedMimeTypes.join(', ')}`
      );
    }

    // Additional security: Check file extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf', '.doc', '.docx', '.txt', '.rtf'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension)) {
      throw new UnsupportedMediaTypeException(
        `Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`
      );
    }
  }
}