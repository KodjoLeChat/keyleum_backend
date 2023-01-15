import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TenantCreateInput } from '../dtos/tenant_create.dto';
import { TenantUpdateInput } from '../dtos/tenant_update.dto';
import { Tenant } from '../models/tenant.model';
import { TenantService } from '../tenant.service';

@Resolver(Tenant)
export class TenantMutationsResolver {
  constructor(private readonly tenantService: TenantService) {}

  @Mutation(() => Tenant, { nullable: true })
  async insert_tenant(@Args('input') input: TenantCreateInput) {
    const tenant = await this.tenantService.createTenant(input);
    return tenant;
  }

  @Mutation(() => Tenant, { nullable: true })
  async update_tenant(
    @Args('id') id: string,
    @Args('input') input: TenantUpdateInput,
  ) {
    const tenant = await this.tenantService.updateTenant(id, input);
    return tenant;
  }

  @Mutation(() => Tenant, { nullable: true })
  async delete_tenant(@Args('id') id: string) {
    const tenant = await this.tenantService.deleteTenant(id);
    return tenant;
  }
}
