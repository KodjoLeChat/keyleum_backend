import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessorEvent } from 'src/events/lessor.event';
import { FlatImageModule } from 'src/flat_image/flat_image.module';
import { LessorModule } from 'src/lessor/lessor.module';
import { OrganisationModule } from 'src/organisation/organisation.module';
import { FlatService } from './flat.service';
import { Flat } from './models/flat.model';
import { FlatMutationResolver } from './resolvers/flat.mutations.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flat]),
    forwardRef(() => OrganisationModule),
    forwardRef(() => FlatImageModule),
    forwardRef(() => LessorModule),
  ],
  providers: [FlatService, LessorEvent, FlatMutationResolver],
  exports: [FlatService],
})
export class FlatModule {}
