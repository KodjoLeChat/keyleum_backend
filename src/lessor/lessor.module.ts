import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessorEvent } from 'src/events/lessor.event';
import { FlatService } from 'src/flat/flat.service';
import { Flat } from 'src/flat/models/flat.model';
import { FlatImageModule } from 'src/flat_image/flat_image.module';
import { OrganisationModule } from 'src/organisation/organisation.module';
import { LessorService } from './lessor.service';
import { Lessor } from './models/lessor.model';
import { LessorFieldsResolver } from './resolvers/lessor.fields.resolvers';
import { LessorMutationsResolver } from './resolvers/lessor.mutations.resolvers';
import { LessorQueriesResolver } from './resolvers/lessor.queries.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lessor]),
    TypeOrmModule.forFeature([Flat]),
    forwardRef(() => OrganisationModule),
    forwardRef(() => FlatImageModule),
  ],
  providers: [
    LessorService,
    FlatService,
    LessorMutationsResolver,
    LessorQueriesResolver,
    LessorFieldsResolver,
    LessorEvent,
  ],
  exports: [LessorService],
})
export class LessorModule {}
