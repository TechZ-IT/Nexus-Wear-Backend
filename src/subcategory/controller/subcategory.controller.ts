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
import { SubcategoryService } from '../service/subcategory.service';
import { ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateSubcategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.subcategoryService.create(dto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcategory' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('categoryId') categoryId,
  ) {
    return this.subcategoryService.findAll({ limit, page, categoryId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subcategory by ID' })
  findOne(@Param('id') id: number) {
    return this.subcategoryService.findOne(id);
  }
}
