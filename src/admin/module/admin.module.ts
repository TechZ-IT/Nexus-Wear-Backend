import { Module } from '@nestjs/common';
import { AdminController } from '../controller/admin.controller';
import { AdminService } from '../service/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entity/admin.entity';
import { Role } from 'src/role/entity/role.entity';
import { AuthModule } from 'src/auth/module/auth.module';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Role]), AuthModule, R2UploadModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
