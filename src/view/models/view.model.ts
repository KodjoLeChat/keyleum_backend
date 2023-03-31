import { Field, ObjectType } from '@nestjs/graphql';
import { Flat } from 'src/flat/models/flat.model';
import { Node } from 'src/pagination/models/node.model';
import { Tenant } from 'src/tenant/models/tenant.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class View extends Node {
  @Column()
  @Field(() => Date)
  viewedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.views)
  @JoinColumn()
  @Field(() => Tenant, { nullable: true })
  tenant: Tenant;

  @Field(() => String)
  @RelationId((self: View) => self.flat)
  readonly flatId: Flat['id'];

  @ManyToOne(() => Flat, (flat) => flat.views)
  @JoinColumn()
  flat: Flat;

  @Field(() => String)
  @RelationId((self: View) => self.tenant)
  tenantId: Tenant['id'];

  //   @Index(['user', 'film'], { unique: true })
  //   uniqueUserFilm: {};
}
