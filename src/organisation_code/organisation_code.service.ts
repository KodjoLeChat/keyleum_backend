import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganisationCodeState } from 'src/common/enum/states.enum';
import { FirebaseService } from 'src/common/services/firebase.service';
import { StringUtils } from 'src/common/utils/string.utils';
import { OrganisationService } from 'src/organisation/organisation.service';
import { Repository } from 'typeorm';
import { OrganisationCode } from './models/organisation_code.model';

@Injectable()
export class OrganisationCodeService {
  constructor(
    @Inject(OrganisationService)
    private readonly organisationService: OrganisationService,
    @InjectRepository(OrganisationCode)
    private readonly organisationCodeRepository: Repository<OrganisationCode>,
  ) {}

  private async insertOrganisationCode(
    organisationId: string,
  ): Promise<OrganisationCode> {
    const organisation = await this.organisationService.getOrganisation(
      organisationId,
    );
    if (!organisation) return null;
    const code = await this.generateConfirmationCode();

    let organisationCode = this.organisationCodeRepository.create({
      code: code,
      organisationId: organisationId,
    });
    organisationCode.organisation = organisation;
    organisationCode = await organisationCode.save();
    return organisationCode;
  }

  private async generateConfirmationCode(): Promise<string> {
    let confirmationCode: string;
    let orgCode: OrganisationCode;
    do {
      const timestamp = Date.now().toString();
      const randomNum = Math.floor(Math.random() * 1000000).toString();
      confirmationCode = StringUtils.randomString(
        StringUtils.shuffleString(timestamp + randomNum),
        6,
      );
      orgCode = await this.getByCode(Number(confirmationCode));
    } while (orgCode);

    return confirmationCode;
  }

  private async getById(id: string): Promise<OrganisationCode> {
    const organisationCode = await this.organisationCodeRepository
      .createQueryBuilder('organisationCode')
      .where('id = :id AND organisationCode.state = :state', {
        id: id,
        state: OrganisationCodeState.unused,
      })
      .getOne();

    return organisationCode;
  }

  private async getByCode(code: number): Promise<OrganisationCode> {
    const organisationCode = await this.organisationCodeRepository
      .createQueryBuilder('organisationCode')
      .where('code = :code', {
        code: code,
      })
      .getOne();

    return organisationCode;
  }

  async getOrganisationCode(organisationId: string): Promise<OrganisationCode> {
    const users = await FirebaseService.users();
    users.users.map(async (user) => {
      console.log(user);
    });
    const organisationCode = await this.insertOrganisationCode(organisationId);
    return organisationCode;
  }

  async getOrganisationCodes(): Promise<OrganisationCode[]> {
    const organisationCode = await this.organisationCodeRepository
      .createQueryBuilder('organisationCode')
      .where('organisationCode.state = :state', {
        state: OrganisationCodeState.unused,
      })
      .getMany();

    return organisationCode;
  }

  async updateOrganisationCode(id: string): Promise<OrganisationCode> {
    let organisationCode = await this.getById(id);
    if (!organisationCode) return null;
    organisationCode.state = OrganisationCodeState.used;
    organisationCode.version += 1;
    organisationCode = await organisationCode.save();
    return organisationCode;
  }
}
