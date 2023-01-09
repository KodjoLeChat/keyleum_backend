import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessorService } from './lessor.service';
import { Lessor } from './models/lessor.model';
import { LessorMutationsResolver } from './resolvers/lessor.mutations.resolvers';
import { LessorQueriesResolver } from './resolvers/lessor.queries.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Lessor])],
  providers: [LessorService, LessorMutationsResolver, LessorQueriesResolver],
})
export class LessorModule {}
