import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entity/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { AuthService } from 'src/auth/service/auth.service';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { RoleService } from 'src/role/service/role.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private readonly authService: AuthService,
    private readonly r2UploadService: R2UploadService,
    private readonly roleService: RoleService,
  ) {}

  async create(createAdminDto: CreateAdminDto, image: Express.Multer.File) {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    console.log(existingAdmin);
    if (existingAdmin) {
      throw new ForbiddenException('Admin with this email already exists');
    }

    const getRoleById = await this.roleService.findOne(createAdminDto.roleId);

    if (!getRoleById) {
      throw new NotFoundException(
        `Role with Id: ${createAdminDto.roleId} not found!`,
      );
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

    const adminInfo = await this.adminRepository.findOne({
      where: { email: savedAdmin.email },
      relations: ['role'],
    });

    if (!adminInfo) {
      throw new NotFoundException('Admin not found');
    }

    const token = this.authService.generateToken({
      id: savedAdmin.id,
      email: savedAdmin.email,
      role: adminInfo.role.name,
    });

    console.log(savedAdmin.role);

    return {
      data: savedAdmin,
      accessToken: token,
      message: 'Admin Registered Successfully',
      status: 'success',
    };
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: dto.email },
    });

    if (!admin) {
      throw new NotFoundException('Admin with this email not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    const token = this.authService.generateToken({});
  }
}
