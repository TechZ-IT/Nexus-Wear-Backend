import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoryService.create(dto, image)
  }
}
