import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganisationCodeState } from 'src/common/enum/states.enum';
import { Organisation } from 'src/organisation/models/organisation.model';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

registerEnumType(OrganisationCodeState, { name: 'OrganisationCodeState' });

@Entity()
@ObjectType()
export class OrganisationCode extends Node {
  @Field(() => String)
  @Column({ unique: true })
  code: string;

  @Field(() => OrganisationCodeState)
  @Column({ default: OrganisationCodeState.unused })
  state: OrganisationCodeState;

  @ManyToOne(() => Organisation, (organisation) => organisation.codes)
  @JoinColumn()
  organisation: Organisation;

  @Field(() => String)
  @RelationId((self: OrganisationCode) => self.organisation)
  readonly organisationId: Organisation['id'];
}
