import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { events } from 'src/common/constants/events.constants';
import { OrganisationState } from 'src/common/enum/states.enum';
import { LessorCreateInput } from 'src/lessor/dtos/lessor_create.dto';
import { LessorService } from 'src/lessor/lessor.service';
import { Repository } from 'typeorm';
import { OrganisationInsertInput } from './dtos/organisation_insert.dto';
import { OrganisationUpdateInput } from './dtos/organisation_update.dto';
import { Organisation } from './models/organisation.model';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(LessorService)
    private readonly lessorService: LessorService,
    @InjectRepository(Organisation)
    private readonly organisationRepository: Repository<Organisation>,
  ) {}

  private async getById(id: string): Promise<Organisation> {
    const organisation = await this.organisationRepository
      .createQueryBuilder('organisation')
      .where('organisation.id = :id AND organisation.state <> :state', {
        id: id,
        state: OrganisationState.deleted,
      })
      .getOne();

    return organisation;
  }

  async getOrganisation(id: string): Promise<Organisation> {
    const organisation = await this.getById(id);
    return organisation;
  }

  async getOrganisations(): Promise<Organisation[]> {
    const organisations = await this.organisationRepository
      .createQueryBuilder('organisation')
      .where('organisation.state <> :state', {
        state: OrganisationState.deleted,
      })
      .getMany();
    return organisations;
  }

  async insertOrganisation(
    input: OrganisationInsertInput,
  ): Promise<Organisation> {
    let organisation = this.organisationRepository.create(input);
    organisation = await organisation.save();
    return organisation;
  }

  async insertorganisationAndLessor(
    organisationInput: OrganisationInsertInput,
    lessorInput: LessorCreateInput,
  ): Promise<Organisation> {
    const organisation = await this.insertOrganisation(organisationInput);
    if (!organisation) return null;
    lessorInput.organisationId = organisation.id;
    const lessor = await this.lessorService.createLessor(lessorInput);
    if (!lessor) {
      await this.deleteOrganisation(organisation.id);
      return null;
    }
    return organisation;
  }

  async deleteOrganisation(id: string): Promise<Organisation> {
    let organisation = await this.getById(id);
    if (!organisation) return null;
    organisation.primaryPhoneNumber = organisation.primaryPhoneNumber.concat(
      `#${organisation.id}#deleted`,
    );
    if (!organisation.email) {
      organisation.email = organisation.email.concat(
        `#${organisation.id}#deleted`,
      );
    }
    organisation.version += 1;
    organisation = await organisation.save();
    if (!organisation)
      this.eventEmitter.emit(events.ORGANISATION_NOT_DELETED, organisation);

    this.eventEmitter.emit(events.ORGANISATION_DELETED, organisation);

    return organisation;
  }

  async updateOrganisation(
    id: string,
    input: OrganisationUpdateInput,
  ): Promise<Organisation> {
    let organisation = await this.getById(id);
    if (!organisation) return null;

    organisation.address = input.address;
    organisation.city = input.city;
    organisation.type = input.type;
    organisation.version += 1;
    if (input.name) organisation.name = input.name;
    if (input.secondaryPhoneNumber)
      organisation.secondaryPhoneNumber = input.secondaryPhoneNumber;
    if (input.whatsAppNumber)
      organisation.whatsAppNumber = input.whatsAppNumber;
    if (input.email) organisation.email = input.email;

    organisation = await organisation.save();
    return organisation;
  }

  async getLessor(lessorId: string) {
    const lessor = await this.lessorService.getLessor(lessorId);
    return lessor;
  }
}
