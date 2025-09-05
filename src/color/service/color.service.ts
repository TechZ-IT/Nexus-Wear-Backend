import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../entity/color.entity';
import { Repository } from 'typeorm';
import { CreateColorDto } from '../dto/create-color.dto';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    private readonly r2UploadService: R2UploadService,
  ) {}

  async create(createColorDto: CreateColorDto, image: Express.Multer.File) {
    const { image: img, ...withoutImage } = createColorDto;

    const color = this.colorRepository.create(withoutImage);
    const savedColor = await this.colorRepository.save(color);
    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        savedColor.id,
        'color',
      );
      if (!imageUrl) {
        throw new Error('Color image upload failed');
      }
      savedColor.image = imageUrl;
      await this.colorRepository.save(savedColor);
    }
    return {
      data: savedColor,
      message: 'Created Color Successfully',
      status: 'success',
    };
  }
}
