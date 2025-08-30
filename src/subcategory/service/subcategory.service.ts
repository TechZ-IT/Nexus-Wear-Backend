import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { Subcategory } from '../entity/subcategory.entity';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    private readonly r2UploadService: R2UploadService,
  ) {}

  async create(dto: CreateSubcategoryDto, image?: Express.Multer.File) {
    const existing = await this.subcategoryRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException('Subcategory already exist!');
    }
    const { image: i, ...withoutImage } = dto;

    const subcategory = this.subcategoryRepository.create(withoutImage);
    const savedSubcategory = await this.subcategoryRepository.save(subcategory);

    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        savedSubcategory.id,
        'subcategory',
      );
      if (!imageUrl) {
        throw new BadRequestException('Image upload failed!');
      }
      savedSubcategory.image = imageUrl;
      await this.subcategoryRepository.save(savedSubcategory);
    }
    return {
      data: savedSubcategory,
      message: 'Created Subcategory Successfully',
      status: 'success',
    };
  }


}
