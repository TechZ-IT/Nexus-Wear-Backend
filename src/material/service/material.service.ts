import { Injectable, NotFoundException } from '@nestjs/common';
import { Material } from '../entity/material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly MaterialRepository: Repository<Material>,

    private readonly r2UploadService: R2UploadService,
  ) {}

  async create(
    createMaterialDto: CreateMaterialDto,
    image: Express.Multer.File,
  ) {
    const { image: img, ...withoutImage } = createMaterialDto;

    const material = this.MaterialRepository.create(withoutImage);
    const savedMaterial = await this.MaterialRepository.save(material);
    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        savedMaterial.id,
        'material',
      );
      if (!imageUrl) {
        throw new Error('Material image upload failed');
      }
      savedMaterial.image = imageUrl;
      await this.MaterialRepository.save(savedMaterial);
    }
    return {
      data: savedMaterial,
      message: 'Created Material Successfully',
      status: 'success',
    };
  }

  async findAll({
    limit = 0,
    page = 0,
  }: {
    limit?: number;
    page?: number;
  }): Promise<{
    data: Material[];
    page: number;
    limit: number;
    total: number;
  }> {
    const query = this.MaterialRepository.createQueryBuilder(
      'Material',
    ).orderBy('Material.id', 'DESC');

    if (limit && page) {
      console.log('hello');
      query.skip((page - 1) * limit).take(limit);
    }

    const [data, total] = await query.getManyAndCount();

    return { data, page, limit, total };
  }

  async findOne(id: number) {
    const Material = await this.MaterialRepository.createQueryBuilder(
      'Material',
    )
      .where('Material.id = :id', { id })
      .getOne();

    if (!Material) {
      throw new NotFoundException(`Material with ID:${id} not found`);
    }
    return Material;
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
    image: Express.Multer.File,
  ) {
    const material = await this.findOne(id);
    const { image: img, ...withoutImage } = updateMaterialDto;

    Object.assign(material, withoutImage);
    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        id,
        'Material',
      );
      if (!imageUrl) {
        throw new Error('Material image upload failed');
      }
      material.image = imageUrl;
    }
    await this.MaterialRepository.save(material);

    return {
      data: material,
      message: 'Updated Material Successfully!',
      status: 'success',
    };
  }

  async remove(id: number) {
    const result = await this.MaterialRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Material not found with Id:${id}`);
    return { message: `Material deleted with ID:${id}`, status: 'status' };
  }
}
