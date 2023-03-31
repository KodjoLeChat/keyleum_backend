import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlatService } from 'src/flat/flat.service';
import { Flat } from 'src/flat/models/flat.model';
import { TenantService } from 'src/tenant/tenant.service';
import { Repository } from 'typeorm';
import { ViewCreateInput } from './dtos/view.create.dto';
import { View } from './models/view.model';

@Injectable()
export class ViewService {
  constructor(
    private readonly flatService: FlatService,
    private readonly tenantService: TenantService,
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>,
  ) {}

  async getViewsByFlat(flat: Flat): Promise<View[]> {
    const views = await this.viewRepository
      .createQueryBuilder('view')
      .where('view.flatId = :flatId', {
        flatId: flat.id,
      })
      .getMany();
    return views;
  }

  async createView(input: ViewCreateInput): Promise<View> {
    const { flatId, tenantId } = input;

    const flat = await this.flatService.getFlat(flatId);
    const tenant = await this.tenantService.getTenant(tenantId);
    const view = this.viewRepository.create(input);
    view.flat = flat;
    view.tenant = tenant;

    return await this.viewRepository.save(view);
  }
}
