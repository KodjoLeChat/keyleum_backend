import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessorEvent } from 'src/events/lessor.event';
import { FlatImageModule } from 'src/flat_image/flat_image.module';
import { LessorModule } from 'src/lessor/lessor.module';
import { OrganisationModule } from 'src/organisation/organisation.module';
import { ViewModule } from 'src/view/view.module';
import { FlatService } from './flat.service';
import { Flat } from './models/flat.model';
import { FlatMutationResolver } from './resolvers/flat.mutations.resolvers';
import { FlatQueriesResolver } from './resolvers/flat.queries.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flat]),
    forwardRef(() => OrganisationModule),
    forwardRef(() => FlatImageModule),
    forwardRef(() => LessorModule),
    forwardRef(() => ViewModule),
  ],
  providers: [
    FlatService,
    LessorEvent,
    FlatMutationResolver,
    FlatQueriesResolver,
  ],
  exports: [FlatService],
})
export class FlatModule {}
