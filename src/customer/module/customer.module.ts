import { Module } from '@nestjs/common';
import { CustomerController } from '../controller/customer.controller';
import { CustomerService } from '../service/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entity/customer.entity';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';
import { AuthModule } from 'src/auth/module/auth.module';
import { Role } from 'src/role/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Role]), R2UploadModule, AuthModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
