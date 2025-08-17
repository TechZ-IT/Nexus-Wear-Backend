import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { LoginDto } from '../dto/login.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customerService.create(createCustomerDto, image);
  }

  @Post('login')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  login(
    @UploadedFile() image: Express.Multer.File,
    @Body() loginDto: LoginDto,
  ) {
    return this.customerService.login(loginDto);
  }
}
