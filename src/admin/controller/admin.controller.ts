import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { ApiConsumes } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { LoginAdminDto } from '../dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @HttpCode(HttpStatus.CREATED)
  Create(
    @Body() createAdminDto: CreateAdminDto,
    @UploadedFiles() files: { image: Express.Multer.File },
  ) {
    return this.adminService.create(createAdminDto, files.image?.[0]);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  login(@Body() loginDto: LoginAdminDto) {
    return this.adminService.login(loginDto);
  }
}
