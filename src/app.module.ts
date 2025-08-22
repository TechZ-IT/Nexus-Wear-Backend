import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CustomerModule } from './customer/module/customer.module';
import * as dotenv from 'dotenv';
import { R2UploadModule } from './r2-upload/module/r2-upload.module';
import { RoleModule } from './role/module/role.module';
import { AuthModule } from './auth/module/auth.module';
import { AdminModule } from './admin/module/admin.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerModule,
    R2UploadModule,
    RoleModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
