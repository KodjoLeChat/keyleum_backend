import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatModule } from 'src/flat/flat.module';
import { TenantModule } from 'src/tenant/tenant.module';
import { View } from './models/view.model';
import { ViewMutationsResolver } from './resolvers/view.mutations.resolvers';
import { ViewQueriesResolver } from './resolvers/view.queries.resolvers';
import { ViewService } from './view.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([View]),
    forwardRef(() => FlatModule),
    forwardRef(() => TenantModule),
  ],
  providers: [ViewService, ViewMutationsResolver, ViewQueriesResolver],
  exports: [ViewService],
})
export class ViewModule {}
