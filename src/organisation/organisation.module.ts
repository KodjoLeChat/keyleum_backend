import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatModule } from 'src/flat/flat.module';
import { LessorModule } from 'src/lessor/lessor.module';
import { Organisation } from './models/organisation.model';
import { OrganisationService } from './organisation.service';
import { OrganisationMutationsResolver } from './resolvers/organisation.mutations.resolvers';
import { OrganisationQueriesResolver } from './resolvers/organisation.queries.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organisation]),
    forwardRef(() => LessorModule),
    forwardRef(() => FlatModule),
  ],
  providers: [
    OrganisationService,
    OrganisationMutationsResolver,
    OrganisationQueriesResolver,
  ],
  exports: [OrganisationService],
})
export class OrganisationModule {}
