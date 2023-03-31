import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FlatService } from 'src/flat/flat.service';
import { Flat } from 'src/flat/models/flat.model';
import { Tenant } from 'src/tenant/models/tenant.model';
import { TenantService } from 'src/tenant/tenant.service';
import { View } from '../models/view.model';

@Resolver(View)
export class ViewQueriesResolver {
  constructor(
    private readonly flatService: FlatService,
    private readonly tenantService: TenantService,
  ) {}

  @ResolveField(() => Tenant)
  async tenant(@Parent() view: View): Promise<Tenant> {
    const tenantId = view.tenantId;
    const tenant = await this.tenantService.getTenant(tenantId);
    return tenant;
  }

  @ResolveField(() => Flat)
  async flat(@Parent() view: View): Promise<Flat> {
    const flatId = view.flatId;
    const flat = await this.flatService.getFlat(flatId);
    return flat;
  }
}
