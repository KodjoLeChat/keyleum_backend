import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
