import { Args, Query, Resolver } from '@nestjs/graphql';
import { Tenant } from '../models/tenant.model';
import { TenantService } from '../tenant.service';

@Resolver(Tenant)
export class TenantQueriesResolver {
  constructor(private readonly tenantService: TenantService) {}

  @Query(() => Tenant, { nullable: true })
  async tenant(@Args('id') id: string) {
    const tenant = await this.tenantService.getTenant(id);
    return tenant;
  }

  @Query(() => [Tenant])
  async tenants() {
    const tenants = await this.tenantService.getAllTenants();
    return tenants;
  }

  @Query(() => Tenant, { nullable: true })
  async tenantByUuid(@Args('uuid') uuid: string) {
    const tenant = await this.tenantService.getTenantByUuid(uuid);
    return tenant;
  }
}
