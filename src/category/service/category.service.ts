import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly r2UploadService: R2UploadService,
  ) {}

  async create(dto: CreateCategoryDto, image?: Express.Multer.File) {
    const existing = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException('Category already exist!');
    }
    const { image: i, ...withoutImage } = dto;

    const category = this.categoryRepository.create(withoutImage);
    const savedCategory = await this.categoryRepository.save(category);

    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        savedCategory.id,
        'category',
      );
      if (!imageUrl) {
        throw new BadRequestException('Image upload failed!');
      }
      savedCategory.image = imageUrl;
      await this.categoryRepository.save(savedCategory);
    }
    return {
      data: savedCategory,
      message: 'Created Category Successfully',
      status: 'success',
    };
  }

  async findAll({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<{ data: Category[]; page; total; limit }> {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategory', 'subcategory')
      .orderBy('category.id', 'DESC');

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .leftJoinAndSelect('category.subcategory', 'subcategory')
      .getOne();

    if (!category) {
      throw new NotFoundException('Category Not Found');
    }

    return category;
  }
}
