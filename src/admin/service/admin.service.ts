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
import { AdminStatus } from 'src/common/types/status.enum';

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
    // console.log(existingAdmin);
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
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        savedAdmin.id,
        'admin'
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
      data: adminInfo,
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

    const adminInfo = await this.adminRepository.findOne({
      where: { email: admin.email },
      relations: ['role'],
    });

    if (!adminInfo) {
      throw new NotFoundException('Admin not found');
    }

    const token = this.authService.generateToken({
      id: admin.id,
      email: admin.email,
      role: adminInfo.role.name,
    });
    return {
      data: adminInfo,
      accessToken: token,
      message: 'Admin login successful!',
      status: 'success',
    };
  }

  async findAll({
    limit = 10,
    page = 1,
    status,
  }: {
    limit: number;
    page: number;
    status?: AdminStatus;
  }): Promise<{ data: Admin[]; total: number; page: number; limit: number }> {
    const query = this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.role', 'role')
      .orderBy('admin.id', 'DESC');

    if (status) {
      query.andWhere('admin.status LIKE status', {
        status,
      });
    }

    //pagination
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, limit, total, page };
  }
}
