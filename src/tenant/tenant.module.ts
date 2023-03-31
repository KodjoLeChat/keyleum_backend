import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEvent } from 'src/events/tenant.event';
import { ViewModule } from 'src/view/view.module';
import { Tenant } from './models/tenant.model';
import { TenantMutationsResolver } from './resolvers/tenant.mutations.resolvers';
import { TenantQueriesResolver } from './resolvers/tenant.queries.resolvers';
import { TenantService } from './tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), forwardRef(() => ViewModule)],
  providers: [
    TenantService,
    TenantMutationsResolver,
    TenantQueriesResolver,
    TenantEvent,
  ],
  exports: [TenantService],
})
export class TenantModule {}
