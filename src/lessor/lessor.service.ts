import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { events } from 'src/common/constants/events.constants';
import { UserState } from 'src/common/enum/states.enum';
import { FirebaseService } from 'src/common/services/firebase.service';
import { PhoneNumberUtils } from 'src/common/utils/phone_number.utils';
import { Repository } from 'typeorm';
import {
  LessorCreateInput,
  LessorCreateOutput,
} from './dtos/lessor_create.dto';
import { LessorDeleteOutPut } from './dtos/lessor_delete.dto';
import {
  Lessors,
  LessorUpdateInput,
  LessorUpdateOutput,
} from './dtos/lessor_update.dto';
import { Lessor } from './models/lessor.model';

@Injectable()
export class LessorService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(Lessor)
    private readonly lessorRepository: Repository<Lessor>,
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

  async deleteLessor(id: string): Promise<LessorDeleteOutPut> {
    let lessor = await this.getById(id);
    if (!lessor) {
      return { lessor };
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
    return { lessor: lessor };
  }

  async updateLessor(
    id: string,
    input: LessorUpdateInput,
  ): Promise<LessorUpdateOutput> {
    let lessor = await this.getById(id);
    if (!lessor) {
      return { lessor: lessor };
    }
    lessor.firstName = input.firstName;
    lessor.lastName = input.lastName;
    lessor.email = input.email;
    lessor.secondaryPhoneNumber = input.secondaryPhoneNumber;
    lessor.whatsAppPhoneNumber = input.whatsAppPhoneNumber;
    lessor.address = input.address;
    lessor.city = input.city;
    lessor.gender = input.gender;
    lessor.version = lessor.version + 1;

    lessor = await this.lessorRepository.save(lessor);
    return { lessor: lessor };
  }

  async createLessor(input: LessorCreateInput): Promise<LessorCreateOutput> {
    let lessor = this.lessorRepository.create(input);
    const isValid = PhoneNumberUtils.isValidPhoneNumberForChad(
      lessor.primaryPhoneNumber,
    );
    const userExist = await FirebaseService.userExists(lessor.uuid);
    if (!isValid || !userExist) {
      return { lessor: null };
    }
    lessor = await lessor.save();
    return { lessor };
  }

  async getLessor(id: string): Promise<LessorCreateOutput | null> {
    const lessor = await this.getById(id);
    return { lessor };
  }

  async getAllLessor(): Promise<Lessors> {
    const lessors = await this.lessorRepository
      .createQueryBuilder('lessor')
      .where('lessor.state <> :state', { state: UserState.deleted })
      .getMany();

    return { lessors };
  }
}
