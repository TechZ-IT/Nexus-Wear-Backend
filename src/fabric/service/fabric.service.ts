import { Injectable, NotFoundException } from '@nestjs/common';
import { Fabric } from '../entity/fabric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import { CreateFabricDto } from '../dto/create-fabric.dto';
import { UpdateFabricDto } from '../dto/update-fabric.dto';

@Injectable()
export class FabricService {
  constructor(
    @InjectRepository(Fabric)
    private readonly fabricRepository: Repository<Fabric>,

    private readonly r2UploadService: R2UploadService,
  ) {}

  async create(createFabricDto: CreateFabricDto, image: Express.Multer.File) {
    const { image: img, ...withoutImage } = createFabricDto;

    const fabric = this.fabricRepository.create(withoutImage);
    const savedFabric = await this.fabricRepository.save(fabric);
    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        savedFabric.id,
        'fabric',
      );
      if (!imageUrl) {
        throw new Error('fabric image upload failed');
      }
      savedFabric.image = imageUrl;
      await this.fabricRepository.save(savedFabric);
    }
    return {
      data: savedFabric,
      message: 'Created fabric Successfully',
      status: 'success',
    };
  }

  async findAll({
    limit = 0,
    page = 0,
  }: {
    limit?: number;
    page?: number;
  }): Promise<{ data: Fabric[]; page: number; limit: number; total: number }> {
    const query = this.fabricRepository
      .createQueryBuilder('fabric')
      .orderBy('fabric.id', 'DESC');

    if (limit && page) {
      console.log('hello');
      query.skip((page - 1) * limit).take(limit);
    }

    const [data, total] = await query.getManyAndCount();

    return { data, page, limit, total };
  }

  async findOne(id: number) {
    const fabric = await this.fabricRepository
      .createQueryBuilder('fabric')
      .where('fabric.id = :id', { id })
      .getOne();

    if (!fabric) {
      throw new NotFoundException(`fabric with ID:${id} not found`);
    }
    return fabric;
  }

  async update(
    id: number,
    updateFabricDto: UpdateFabricDto,
    image: Express.Multer.File,
  ) {
    const fabric = await this.findOne(id);
    const { image: img, ...withoutImage } = updateFabricDto;

    Object.assign(fabric, withoutImage);
    if (image) {
      const imageUrl = await this.r2UploadService.uploadImage(
        image,
        id,
        'fabric',
      );
      if (!imageUrl) {
        throw new Error('Fabric image upload failed');
      }
      fabric.image = imageUrl;
    }
    await this.fabricRepository.save(fabric);

    return {
      data: fabric,
      message: 'Updated fabric Successfully!',
      status: 'success',
    };
  }
}
