import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entity/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private readonly authService: AuthService,
    private readonly r2UploadService: R2UploadService,
  ) {}

  async create(createAdminDto: CreateAdminDto, image: Express.Multer.File) {
    const existingAdmin = await this.adminRepository.find({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ForbiddenException('Admin with this email already exists');
    }

    const { image: img, ...adminData } = createAdminDto;

    adminData.password = await bcrypt.hash(adminData.password, 10);

    const admin = this.adminRepository.create(adminData);
    const savedAdmin = await this.adminRepository.save(admin);

    if (image) {
      const imageUrl = await this.r2UploadService.uploadAdminImage(
        image,
        savedAdmin.id,
      );
      if (!imageUrl) {
        throw new Error('Failed to upload image');
      }
      savedAdmin.image = imageUrl;
      await this.adminRepository.save(savedAdmin);
    }

    const token = this.authService.generateToken({
      id: savedAdmin.id,
      email: savedAdmin.email,
      role: savedAdmin.role.name,
    });

    return {
      data: savedAdmin,
      accessToken: token,
      message: 'Admin Registered Successfully',
      status: 'success',
    };
  }
}
