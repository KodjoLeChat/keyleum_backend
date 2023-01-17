import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganisationState } from 'src/common/enum/states.enum';
import { OrganisationType } from 'src/common/enum/types.enum';
import { Flat } from 'src/flat/models/flat.model';
import { Lessor } from 'src/lessor/models/lessor.model';
import { OrganisationCode } from 'src/organisation_code/models/organisation_code.model';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity, OneToMany } from 'typeorm';

registerEnumType(OrganisationState, { name: 'OrganisationState' });

registerEnumType(OrganisationType, { name: 'OrganisationType' });

@Entity()
@ObjectType()
export class Organisation extends Node {
  @Field(() => String, { nullable: true })
  @Column({ default: 'Unknown' })
  name: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  city: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, unique: true })
  email?: string;

  @Field(() => String)
  @Column({ unique: true })
  primaryPhoneNumber: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  secondaryPhoneNumber?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  whatsAppNumber?: string;

  @Field(() => OrganisationType)
  @Column()
  type: OrganisationType;

  @Field(() => OrganisationState)
  @Column({ default: OrganisationState.enabled })
  state: OrganisationState;

  @OneToMany(() => OrganisationCode, (target) => target.organisation)
  codes: OrganisationCode[];

  @OneToMany(() => Lessor, (target) => target.organisation)
  lessors: OrganisationCode[];

  @OneToMany(() => Flat, (target) => target.organisation)
  flats: OrganisationCode[];
}
