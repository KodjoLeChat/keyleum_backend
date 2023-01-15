import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEvent } from 'src/events/tenant.event';
import { Tenant } from './models/tenant.model';
import { TenantMutationsResolver } from './resolvers/tenant.mutations.resolvers';
import { TenantQueriesResolver } from './resolvers/tenant.queries.resolvers';
import { TenantService } from './tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    TenantService,
    TenantMutationsResolver,
    TenantQueriesResolver,
    TenantEvent,
  ],
})
export class TenantModule {}
