import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessorEvent } from 'src/events/lessor.event';
import { FlatService } from 'src/flat/flat.service';
import { Flat } from 'src/flat/models/flat.model';
import { LessorService } from './lessor.service';
import { Lessor } from './models/lessor.model';
import { LessorMutationsResolver } from './resolvers/lessor.mutations.resolvers';
import { LessorQueriesResolver } from './resolvers/lessor.queries.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lessor]),
    TypeOrmModule.forFeature([Flat]),
  ],
  providers: [
    LessorService,
    FlatService,
    LessorMutationsResolver,
    LessorQueriesResolver,
    LessorEvent,
  ],
})
export class LessorModule {}
