import { ObjectType } from '@nestjs/graphql';
import { Flat } from 'src/flat/models/flat.model';
import { Person } from 'src/person/models/person.model';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Tenant extends Person {
  @ManyToMany(() => Flat, (flat) => flat.tenants)
  @JoinTable({
    name: 'tenant_flat',
    joinColumn: {
      name: 'tenant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'flat_id',
      referencedColumnName: 'id',
    },
  })
  flats?: Flat[];
}
