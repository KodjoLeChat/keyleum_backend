import { ObjectType } from '@nestjs/graphql';
import { Person } from 'src/person/models/person.model';
import { View } from 'src/view/models/view.model';
import { Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Tenant extends Person {
  @OneToMany(() => View, (view) => view.tenant)
  views: View[];
}
