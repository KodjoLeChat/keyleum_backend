import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { events } from 'src/common/constants/events.constants';
import { UserState } from 'src/common/enum/states.enum';
import { FirebaseService } from 'src/common/services/firebase.service';
import { PhoneNumberUtils } from 'src/common/utils/phone_number.utils';
import { Repository } from 'typeorm';
import { TenantCreateInput } from './dtos/tenant_create.dto';
import { TenantUpdateInput } from './dtos/tenant_update.dto';
import { Tenant } from './models/tenant.model';

@Injectable()
export class TenantService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async getById(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository
      .createQueryBuilder('tenant')
      .where('id = :id AND state <> :state', {
        id: id,
        state: UserState.deleted,
      })
      .getOne();
    return tenant;
  }
  async createTenant(input: TenantCreateInput): Promise<Tenant> {
    const tenant = this.tenantRepository.create(input);
    const exists = await FirebaseService.userExists(tenant.uuid);
    const isValidPhoneNumber = PhoneNumberUtils.isValidPhoneNumber(
      tenant.primaryPhoneNumber,
    );
    if (!isValidPhoneNumber || !exists) return null;
    //tenant.uuid = tenant.uuid.concat(`${StringUtils.generateRandomString()}`);
    await tenant.save();
    return tenant;
  }

  async updateTenant(id: string, input: TenantUpdateInput): Promise<Tenant> {
    let tenant = await this.getById(id);
    if (!tenant) return tenant;
    tenant.firstName = input.firstName;
    tenant.lastName = input.lastName;
    tenant.gender = input.gender;
    tenant.address = input.address;
    tenant.city = input.city;
    tenant.email = input.email;
    tenant.profileLink = input.profileLink;
    tenant.version += 1;

    tenant = await tenant.save();
    return tenant;
  }

  async deleteTenant(id: string): Promise<Tenant> {
    let tenant = await this.getById(id);
    if (!tenant) return tenant;
    const uuid = tenant.uuid;
    tenant.state = UserState.deleted;
    tenant.version += 1;
    tenant.primaryPhoneNumber = tenant.primaryPhoneNumber.concat(
      `#${uuid}#deleted`,
    );
    if (tenant.email) {
      tenant.email = tenant.email.concat(`#${uuid}#deleted`);
    }

    tenant = await tenant.save();
    this.eventEmitter.emit(events.TENANT_DELETED, tenant);
    return tenant;
  }

  async getTenant(id: string): Promise<Tenant> {
    const tenant = await this.getById(id);
    return tenant;
  }

  async getAllTenants(): Promise<Tenant[]> {
    const tenants = await this.tenantRepository
      .createQueryBuilder('tenant')
      .where('state <> :state', { state: UserState.deleted })
      .getMany();
    return tenants;
  }
}
