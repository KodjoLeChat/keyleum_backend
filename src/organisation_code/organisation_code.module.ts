import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationModule } from 'src/organisation/organisation.module';
import { OrganisationCode } from './models/organisation_code.model';
import { OrganisationCodeService } from './organisation_code.service';
import { OrganisationCodeQueriesResolver } from './resolvers/organisation_code.queries.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationCode]), OrganisationModule],
  providers: [OrganisationCodeService, OrganisationCodeQueriesResolver],
})
export class OrganisationCodeModule {}
