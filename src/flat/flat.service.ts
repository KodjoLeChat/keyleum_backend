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

  private async getFlats(): Promise<Flat[]> {
    const flats = await this.flatRepository
      .createQueryBuilder('flat')
      .where('flat.state <> :state', { state: FlatState.deleted })
      .getMany();
    return flats;
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

  async insertFlat(lessorId: string, input: FlatInsertInput): Promise<Flat> {
    const { images, ...imp } = input;

    const lessor = await this.organisationService.getLessor(lessorId);

    if (!lessor) return null;

    const organisationId = lessor.organisationId;

    const organisation = await this.organisationService.getOrganisation(
      organisationId,
    );

    if (!organisation) return null;

    let flat = this.flatRepository.create(imp);

    flat.organisation = organisation;
    flat.lessor = lessor;
    flat.type = organisation.type;
    flat = await flat.save();

    const flatImages = await Promise.all(
      images.map((image) => this.flatImagesService.insert(image, flat)),
    );

    const status = flatImages.filter((im) => !im).length > 0;

    if (status) await this.deleteFlat(flat.id);
    return flat;
  }

  async getFlat(id: string): Promise<Flat> {
    const flat = await this.getById(id);
    if (!flat) return null;
    return flat;
  }

  async getAllFlat(): Promise<Flat[]> {
    const flats = await this.getFlats();
    return flats;
  }

  async findAll(page = 1, perPage = 20): Promise<Flat[]> {
    const flats = await this.flatRepository
      .createQueryBuilder('flat')
      .where('flat.state <> :state', { state: FlatState.deleted })
      .skip((page - 1) * perPage)
      .take(perPage)
      .getMany();

    return flats;
  }

  async getFlatsByLessorId(lessorId: string): Promise<Flat[]> {
    const flats = await this.flatRepository
      .createQueryBuilder('flat')
      .where('flat.lessorId = :lessorId AND flat.state <> :state', {
        lessorId: lessorId,
        state: FlatState.deleted,
      })
      .getMany();
    return flats;
  }

  async getFlatsByOrganisationId(organisationId: string): Promise<Flat[]> {
    const flats = await this.flatRepository
      .createQueryBuilder('flat')
      .where('flat.organisationId = :organisationId AND flat.state <> :state', {
        organisationId: organisationId,
        state: FlatState.deleted,
      })
      .getMany();
    return flats;
  }
}
