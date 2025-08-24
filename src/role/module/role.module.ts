import { Module } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { AuthModule } from 'src/auth/module/auth.module';
import { RoleController } from '../controller/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
