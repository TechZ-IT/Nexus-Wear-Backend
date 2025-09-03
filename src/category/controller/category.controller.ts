import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoryService.create(dto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Categories' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
  ) {
    return this.categoryService.findAll({ limit, page });
  }

  // @Get('all')
  // @ApiOperation({ summary: 'Get all Categories without pagination' })
  // findAllDefault() {
  //   return this.categoryService.findAllDefault();
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }
}
