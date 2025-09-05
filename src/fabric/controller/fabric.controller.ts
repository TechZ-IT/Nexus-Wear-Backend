import {
  Body,
  Controller,
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
import { FabricService } from '../service/fabric.service';
import { ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateFabricDto } from '../dto/update-fabric.dto';
import { CreateFabricDto } from '../dto/create-fabric.dto';
@Controller('fabric')
export class FabricController {
  constructor(private readonly fabricService: FabricService) {}
  @Post()
  @ApiOperation({ summary: 'Create color' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createFabricDto: CreateFabricDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.fabricService.create(createFabricDto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    return this.fabricService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Color by id' })
  findOne(@Param('id') id: number) {
    return this.fabricService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Color' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateFabricDto: UpdateFabricDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.fabricService.update(id, updateFabricDto, image);
  }
}
