import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlatImagesState } from 'src/common/enum/states.enum';
import { Flat } from 'src/flat/models/flat.model';
import { Repository } from 'typeorm';
import { FlatImages } from './models/flat_image.model';

@Injectable()
export class FlatImageService {
  constructor(
    @InjectRepository(FlatImages)
    private readonly flatImagesRepository: Repository<FlatImages>,
  ) {}

  async insert(name: string, flat: Flat): Promise<FlatImages> {
    let images = this.flatImagesRepository.create({ name });
    images.flat = flat;
    images = await images.save();
    return images;
  }

  private async getById(id: string): Promise<FlatImages> {
    const images = await this.flatImagesRepository
      .createQueryBuilder('images')
      .where('images.flatId = :id AND state <> state', {
        id,
        state: FlatImagesState.deleted,
      })
      .getOne();
    return images;
  }

  async getImagesByFlatId(id: string): Promise<FlatImages[]> {
    const images = await this.flatImagesRepository
      .createQueryBuilder('images')
      .where('images.flatId = :id', { id })
      .getMany();
    return images;
  }

  async delete(id: string): Promise<FlatImages> {
    let images = await this.getById(id);
    if (!images) return null;
    images.state = FlatImagesState.deleted;
    images = await this.flatImagesRepository.save(images);
    return images;
  }
}
