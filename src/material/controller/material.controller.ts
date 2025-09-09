import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { MaterialService } from '../service/material.service';
import { UpdateMaterialDto } from '../dto/update-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @Post()
  @ApiOperation({ summary: 'Create material' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createMaterialDto: CreateMaterialDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.materialService.create(createMaterialDto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    return this.materialService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get material by id' })
  findOne(@Param('id') id: number) {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update material' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.materialService.update(id, updateMaterialDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.materialService.remove(id);
  }
}
