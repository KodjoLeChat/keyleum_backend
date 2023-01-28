import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { events } from 'src/common/constants/events.constants';
import { FlatState } from 'src/common/enum/states.enum';
import { FlatImageService } from 'src/flat_image/flat_image.service';
import { OrganisationService } from 'src/organisation/organisation.service';
import { Repository } from 'typeorm';
import { FlatInsertInput } from './dtos/flat_insert.dto';
import { Flat } from './models/flat.model';

@Injectable()
export class FlatService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(forwardRef(() => FlatImageService))
    private readonly flatImagesService: FlatImageService,
    @Inject(forwardRef(() => OrganisationService))
    private readonly organisationService: OrganisationService,
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
    if (!flat) return null;
    flat.state = FlatState.deleted;
    flat.version = flat.version + 1;
    flat = await this.flatRepository.save(flat);
    if (!flat) {
      this.eventEmitter.emit(events.FLAT_NOT_DELETED, id);
      return null;
    }
    this.eventEmitter.emit(events.FLAT_DELETED, flat);
    return flat;
  }

  async insertFlat(input: FlatInsertInput): Promise<Flat> {
    const { images, organisationId, lessorId, ...imp } = input;

    const organisation = await this.organisationService.getOrganisation(
      organisationId,
    );

    if (!organisation) return null;

    const lessor = await this.organisationService.getLessor(lessorId);

    if (!lessor) return null;

    let flat = this.flatRepository.create(imp);

    flat.organisation = organisation;
    flat.lessor = lessor;
    flat = await flat.save();

    const flatImages = await Promise.all(
      images.map((image) => this.flatImagesService.insert(image, flat)),
    );

    const status = flatImages.filter((im) => !im).length > 0;

    if (status) await this.deleteFlat(flat.id);
    return flat;
  }
}
