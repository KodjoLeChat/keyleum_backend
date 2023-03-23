import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { events } from 'src/common/constants/events.constants';
import { UserState } from 'src/common/enum/states.enum';
import { FirebaseService } from 'src/common/services/firebase.service';
import { PhoneNumberUtils } from 'src/common/utils/phone_number.utils';
import { OrganisationService } from 'src/organisation/organisation.service';
import { Repository } from 'typeorm';
import { LessorCreateInput } from './dtos/lessor_create.dto';
import { LessorUpdateInput } from './dtos/lessor_update.dto';
import { Lessor } from './models/lessor.model';

@Injectable()
export class LessorService {
  constructor(
    private readonly eventEmitter: EventEmitter2,

    @InjectRepository(Lessor)
    private readonly lessorRepository: Repository<Lessor>,

    @Inject(forwardRef(() => OrganisationService))
    private readonly organisationService: OrganisationService,
  ) {}

  private async getById(id: string): Promise<Lessor> {
    const lessor = await this.lessorRepository
      .createQueryBuilder('lessor')
      .where('lessor.id = :id AND lessor.state <> :state', {
        id,
        state: UserState.deleted,
      })
      .getOne();
    return lessor;
  }

  private async getByUuid(uuid: string): Promise<Lessor> {
    const lessor = await this.lessorRepository
      .createQueryBuilder('lessor')
      .where('lessor.uuid = :uuid AND lessor.state <> :state', {
        uuid,
        state: UserState.deleted,
      })
      .getOne();
    return lessor;
  }

  async deleteLessor(id: string): Promise<Lessor> {
    let lessor = await this.getById(id);
    if (!lessor) {
      return lessor;
    }
    lessor.state = UserState.deleted;
    /* add #uuid#deleted at the end of the number and potentially of the email to mean that the user was deleted and like that, 
      if he wants to register again with the same number and the same email, there will not have problem of unicity in DB.
      */
    const uuid = lessor.uuid;
    lessor.primaryPhoneNumber = lessor.primaryPhoneNumber.concat(
      `#${uuid}#deleted`,
    );
    if (lessor.email) {
      lessor.email = lessor.email.concat(`#${uuid}#deleted`);
    }
    lessor.version = lessor.version + 1;
    lessor = await this.lessorRepository.save(lessor);
    // emit event for delete the user flats and delete the user from firebase.
    this.eventEmitter.emit(events.LESSOR_DELETED, lessor);
    return lessor;
  }

  async updateLessor(id: string, input: LessorUpdateInput): Promise<Lessor> {
    let lessor = await this.getById(id);
    if (!lessor) {
      return lessor;
    }
    lessor.firstName = input.firstName;
    lessor.lastName = input.lastName;
    lessor.city = input.city;
    lessor.gender = input.gender;
    lessor.version = lessor.version + 1;
    if (input.email) lessor.email = input.email;
    if (input.secondaryPhoneNumber)
      lessor.secondaryPhoneNumber = input.secondaryPhoneNumber;
    if (input.whatsAppNumber) lessor.whatsAppNumber = input.whatsAppNumber;
    if (input.address) lessor.address = input.address;
    if (input.profileLink) lessor.profileLink = input.profileLink;

    lessor = await this.lessorRepository.save(lessor);
    return lessor;
  }

  async createLessor(input: LessorCreateInput): Promise<Lessor> {
    const organisation = await this.organisationService.getOrganisation(
      input.organisationId,
    );
    if (!organisation) return null;
    let lessor = this.lessorRepository.create(input);
    const isValid = PhoneNumberUtils.isValidPhoneNumber(
      lessor.primaryPhoneNumber,
    );
    const userExist = await FirebaseService.userExists(lessor.uuid);
    if (!isValid || !userExist) {
      return null;
    }
    lessor.organisation = organisation;
    lessor = await lessor.save();
    return lessor;
  }

  async getLessor(id: string): Promise<Lessor> {
    const lessor = await this.getById(id);
    return lessor;
  }

  async getLessorByUuid(uuid: string): Promise<Lessor> {
    const lessor = await this.getByUuid(uuid);
    return lessor;
  }

  async getAllLessor(): Promise<Lessor[]> {
    const lessors = await this.lessorRepository
      .createQueryBuilder('lessor')
      .where('lessor.state <> :state', { state: UserState.deleted })
      .getMany();

    return lessors;
  }

  async getAllLessorByOrganisationId(
    organisationId: string,
  ): Promise<Lessor[]> {
    const lessors = await this.lessorRepository
      .createQueryBuilder('lessor')
      .where(
        'lessor.organisation.id = :organisationId AND lessor.state <> :state',
        {
          organisationId,
          state: UserState.deleted,
        },
      )
      .getMany();

    return lessors;
  }
}
