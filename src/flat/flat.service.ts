import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlatState } from 'src/common/enum/states.enum';
import { Repository } from 'typeorm';
import { Flat } from './models/flat.model';

@Injectable()
export class FlatService {
  constructor(
    @InjectRepository(Flat)
    private readonly flatRepository: Repository<Flat>,
  ) {}

  private async getById(id: string): Promise<Flat> {
    const flat = await this.flatRepository
      .createQueryBuilder('flat')
      .where('flat.id = :id AND flat.state <> :state', {
        id: id,
        state: FlatState.deleted,
      })
      .getOne();
    return flat;
  }

  async deleteFlat(id: string) {
    let flat = await this.getById(id);
    if (!flat) {
      return { flat };
    }
    flat.state = FlatState.deleted;
    flat.version = flat.version + 1;
    // TODO: emit event to notifier FlatImages events to delete the flat images.
    flat = await this.flatRepository.save(flat);
    return { flat };
  }
}
