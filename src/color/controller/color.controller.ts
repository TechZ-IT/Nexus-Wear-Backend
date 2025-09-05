import {
  Body,
  Controller,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ColorService } from '../service/color.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateColorDto } from '../dto/create-color.dto';
import { ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createColorDto: CreateColorDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.colorService.create(createColorDto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    return this.colorService.findAll({ page, limit});
  }
}
