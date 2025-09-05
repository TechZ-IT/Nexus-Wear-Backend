import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ColorService } from '../service/color.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateColorDto } from '../dto/create-color.dto';
import { ApiConsumes } from '@nestjs/swagger';

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
}
